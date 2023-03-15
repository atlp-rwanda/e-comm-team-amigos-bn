import chai, { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import app from "../app";
import models from '../database/models';

dotenv.config();

chai.use(chaiHttp);


describe("Cart Tests", function () {
    let product;
    let user;
    let agent;
    before(async function () {
        await models.sequelize.sync({ force: true });

        user = await models.User.create({
            firstName: "Kaneza",
            lastName: "Erica",
            userName: "Eriallan",
            telephone: "0785188981",
            address: "Kigali",
            email: "eriman@example.com",
            password: await bcrypt.hash("Password@123", 10),
            role: "vendor",
        });

        product =
            await models.Product.create({
                id: uuidv4(),
                userId: user.id,
                name: "Product 1",
                price: 10,
                quantity: 1,
                available: true,
                category: "food",
                bonus: 20,
                images: [
                    "https://picums.photos/200",
                    "https://picums.photos/201",
                    "https://picums.photos/202",
                    "https://picums.photos/203"
                ],
                expiryDate: "2023-12-31T00:00:00.000Z",
                ec: 30
            });
    });

    it("Should return an error if no token sent", async function () {
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);

        const res = await chai.request(app).post(`/cart/?productId=${uuidv4()}&quantity=${1}`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("No token in header..");
    });

    it("Should return an error if a product does not exist", async function () {
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);

        const res = await chai.request(app).post(`/cart/?productId=${uuidv4()}&quantity=${1}`).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Product does not exist..");
    });

    it("Should add a cart of valid users only", async function () {
        const token = jwt.sign({ userId: uuidv4(), role: user.role }, process.env.SECRET_KEY);

        const res = await chai.request(app).post(`/cart/?productId=${uuidv4()}&quantity=${1}`).set("Authorization", `bearer ${token}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("User not authorized..");
    });

    it("Should return an error if quantity is less than 1", async function () {
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);

        const res = await chai.request(app).post(`/cart/?productId=${product.id}&quantity=${0}`).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Quantity cannot be null..");
    });
    it("Should add items to the cart", async function () {
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);

        agent = chai.request.agent(app);
        const res = await agent.post(`/cart/?productId=${product.id}&quantity=${1}`).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("cart saved");
        expect(res.body.cart).to.be.a.instanceof(Array);
    });

    it("Should not add an existing product in the cart", async function () {
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);

        const res = await agent.post(`/cart/?productId=${product.id}&quantity=${1}`).set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Product in cart already. Please update the cart.");
    });
});


describe("View shopping cart test", function () {
    let product;
    let user;
    let agent;
    before(async function () {
        await models.sequelize.sync({ force: true });

        user = await models.User.create({
            firstName: "Kaneza",
            lastName: "Erica",
            userName: "Eriallan",
            telephone: "0785188981",
            address: "Kigali",
            email: "eriman@example.com",
            password: await bcrypt.hash("Password@123", 10),
            role: "vendor",
        });

        product =
            await models.Product.create({
                id: uuidv4(),
                userId: user.id,
                name: "Product 1",
                price: 10,
                quantity: 1,
                available: true,
                category: "food",
                bonus: 20,
                images: [
                    "https://picums.photos/200",
                    "https://picums.photos/201",
                    "https://picums.photos/202",
                    "https://picums.photos/203"
                ],
                expiryDate: "2023-12-31T00:00:00.000Z",
                ec: 30
            });

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);
        agent = chai.request.agent(app);
        await agent.post(`/cart/?productId=${product.id}&quantity=${1}`).set("Authorization", `bearer ${token}`);
    });

    it('returns the correct cart items when there are items in the cart', async () => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await agent.get('/cart/view-cart').send().set("Authorization", `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Cart Items');
    });

    it("Should return an error if a product does not exist", async () => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await chai.request(app).get('/cart/view-cart').send().set("Authorization", `Bearer ${token}`);
        expect(res.status).to.equal(204);
    });
});
