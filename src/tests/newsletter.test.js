import bcrypt from "bcryptjs";
import chai, { expect } from "chai";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import app from "./../app";
import models from "./../database/models";
import generateToken from "../helpers/generateToken";


describe("Subscribe to newsletter", async function () {
    const email = "mail.example@example.com";
    let id;

    before(async function () {
        await models.sequelize.sync({ force: true });
        await models.Newsletter.destroy({ where: {} });
    });
    after(async function () {
        await models.sequelize.sync({ force: true });
    });
    it("Should retun an error if Email is missing", async function () {
        const request = await chai.request(app).post("/newsletter").send({
            firstName: "name", lastName: "second"
        });

        expect(request).to.have.status(400);
        expect(request.body).to.be.an("object");
        expect(request.body.error).to.be.equal('"email" is required');

    });
    it("Should return an error if firstName is missing", async function () {
        const request = await chai.request(app).post("/newsletter").send({
            email, lastName: "second"
        });

        expect(request).to.have.status(400);
        expect(request.body).to.be.an("object");
        expect(request.body.error).to.be.equal('"firstName" is required');
    });
    it("Should add new subscriber", async function () {
        const request = await chai.request(app).post("/newsletter").send({
            email, firstName: "name",
        });

        expect(request).to.have.status(400);
        expect(request.body).to.be.an("object");
        expect(request.body.error).to.be.equal('"lastName" is required');
    });

    it("Should add new subscriber", async function () {
        const request = await chai.request(app).post("/newsletter").send({
            email, firstName: "name", lastName: "second"
        });

        expect(request).to.have.status(201);
        expect(request.body).to.be.an("object");
        expect(request.body.data.email).to.be.equal(email);
        expect(request.body.data.firstName).to.be.equal("name");
        expect(request.body.data.lastName).to.be.equal("second");

        id = request.body.data.id;
    });

    describe("Newsletter email verification", function () {

        it("verify the new subscriber", async function () {
            const request = await chai.request(app).get(`/newsletter/verify/?id=${id}`);
            expect(request).to.have.status(200);
            expect(request.body).to.be.an("object");
            expect(request.body.message).to.be.equal("Email verified.");
        });

        it("Should return an error if email is not verified", async function () {
            const request = await chai.request(app).get(`/newsletter/verify/?id=${uuid()}`);
            expect(request).to.have.status(404);
            expect(request.body).to.be.an("object");
            expect(request.body.error).to.be.equal('Subscriber not found');
        });
    });

    describe("Newsletter unsubscription", function () {
        it("Unsubscribe the new subscriber", async function () {
            const request = await chai.request(app).get(`/newsletter/unsubscribe/?id=${id}`);
            expect(request).to.have.status(200);
            expect(request.body).to.be.an("object");
            expect(request.body.message).to.be.equal("Unsubscribed to newsletter");
        });

        it("Unsubscribe should return an error if there no matching id", async function () {
            const request = await chai.request(app).get(`/newsletter/unsubscribe/?id=${uuid()}`);
            expect(request).to.have.status(404);
            expect(request.body).to.be.an("object");
            expect(request.body.error).to.be.equal("Subscriber not found");
        });
    });
});

describe("Newsletter admin operations", function () {
    let token, subscriber;
    const email = "mail.example@example.com";
    before(async function () {
        await models.sequelize.sync({ force: true });
        await models.Newsletter.destroy({ where: {} });

        subscriber = await models.Newsletter.create({
            email, firstName: "name", lastName: "second"
        });

        const admin = await models.User.create({
            firstName: "admin",
            lastName: "admin",
            email: "anpch@example.com",
            id: uuid(),
            userName: 'admin',
            telephone: '0780908888',
            billingAddress: 'Kigali',
            address: 'Kigali',
            password: await bcrypt.hash('Admin@123', 10),
            status: 'active',
            verified: 'true',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const adminRole = await models.Role.create({
            name: 'admin',
            description: 'admin role',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await models.UserRole.create({
            userId: (admin.toJSON()).id, roleId: (adminRole.toJSON()).id
        });
        token = generateToken({ userId: (admin.toJSON()).id });

    });

    after(async function () {
        await models.sequelize.sync({ force: true });
        await models.Newsletter.destroy({ where: {} });
        await models.User.destroy({ where: {} });
    });

    describe("Admin suspend subscription", function () {
        it("Should not suspend a subscriber if no token provided", async function () {
            const request = await chai.request(app).post("/newsletter/admin").send({
                id: (subscriber.toJSON()).id
            });
            expect(request).to.have.status(401);
        });
        it("Should not suspend a subscriber if token provided is invalid", async function () {
            const request = await chai.request(app).post("/newsletter/admin").send({
                id: (subscriber.toJSON()).id
            }).set("Authorization", "Bearer " + generateToken({ userId: uuid() }));
            expect(request).to.have.status(401);
        });
        it("Should suspend a subscriber if it is admin", async function () {
            const request = await chai.request(app).post("/newsletter/admin").send({
                id: (subscriber.toJSON()).id
            }).set("Authorization", "Bearer " + token);
            expect(request).to.have.status(200);
            expect(request.body).to.be.an("object");
            expect(request.body.message).to.be.equal("Subscriber suspended by Admin");
        });
    });

    describe("Admin Get List of Subscribers", function () {
        it("Should not get subscribers if no token provided", async function () {
            const request = await chai.request(app).get("/newsletter/admin");
            expect(request).to.have.status(401);
        });

        it("Should not get subscribers if token provided is invalid", async function () {
            const request = await chai.request(app).get("/newsletter/admin").set("Authorization", "Bearer " + generateToken({ userId: uuid() }));
            expect(request).to.have.status(401);
        });

        it("Should get subscribers if it is admin", async function () {
            const request = await chai.request(app).get("/newsletter/admin").set("Authorization", "Bearer " + token);
            expect(request).to.have.status(200);
            expect(request.body).to.be.an("object");
            expect(request.body.message).to.be.equal("success");
            expect(request.body.subscribers).to.be.an("array");
        });
    });

    describe("Admin Get a Subscriber by email", function () {
        it("Should not get a subscriber if no token provided", async function () {
            const request = await chai.request(app).get(`/newsletter/admin/${email}`);
            expect(request).to.have.status(401);
        });

        it("Should not get a subscriber if token provided is invalid", async function () {
            const request = await chai.request(app).get(`/newsletter/admin/${email}`).set("Authorization", "Bearer " + generateToken({ userId: uuid() }));
            expect(request).to.have.status(401);
        });

        it("Should get a subscriber if it is admin", async function () {
            const request = await chai.request(app).get(`/newsletter/admin/${email}`).set("Authorization", "Bearer " + token);
            expect(request).to.have.status(200);
            expect(request.body).to.be.an("object");
            expect(request.body.message).to.be.equal("success");
        });
    });

    describe("Admin delete a subscriber", function () {

        it("Should not delete a subscriber if no token provided", async function () {
            const request = await chai.request(app).delete("/newsletter/admin").send({
                id: (subscriber.toJSON()).id
            });

            expect(request).to.have.status(401);

        });

        it("Should not delete a subscriber if no token provided", async function () {
            const request = await chai.request(app).delete("/newsletter/admin").send({
                id: (subscriber.toJSON()).id
            }).set("Authorization", "Bearer " + generateToken({ userId: uuid() }));

            expect(request).to.have.status(401);

        });

        it("Should delete a subscriber if it is admin", async function () {
            const request = await chai.request(app).delete("/newsletter/admin").send({
                id: (subscriber.toJSON()).id
            }).set("Authorization", "Bearer " + token);

            expect(request).to.have.status(200);
            expect(request.body).to.be.an("object");
            expect(request.body.message).to.be.equal("Subscriber deleted.");

        });
    });
});