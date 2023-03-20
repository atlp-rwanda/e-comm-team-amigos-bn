import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import models from "../database/models";
import app from "../app";
import tokenGenerator from "../helpers/generateToken";
chai.use(chaiHttp);
let user;
describe("get All Product", () => {
  before(async () => {
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
    await models.Product.create({
      id: uuidv4(),
      userId: user.id,
      name: "Product 1",
      price: 10,
      quantity: 1,
      available: true,
      category: "food",
      bonus: 20,
      images: ["image1", "image2"],
      expiryDate: "2023-12-31T00:00:00.000Z",
      ec: 30,
    });
  });
  after(async () => {
    await models.User.destroy({ where: {} });
    await models.Product.destroy({ where: {} });
  });

  it("should return a list of all products", (done) => {
    chai
      .request(app)
      .get("/product/getAllItems")
      .end((err, res) => {
        if (err) throw err;
        else {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("Status").to.equal("OK");
          expect(res.body)
            .to.have.property("Message")
            .to.equal("List of all Products in our collections");
          expect(res.body).to.have.property("listProduct").to.be.an("array");
          done();
        }
      });
  });

  it("should return an error message if there are no products", async () => {
    await models.Product.destroy({ where: {} });
    const res = await chai.request(app).get("/product/getAllItems");
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("Status").to.equal("Not Found");
    expect(res.body)
      .to.have.property("error")
      .to.equal("There is no product in Stock");
  });
});

describe("addProduct function", () => {
  let user;

  before(async () => {
    await models.sequelize.sync();
    await models.User.destroy({ where: {} });
    await models.Product.destroy({ where: {} });
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
  });
  after(async () => {
    await models.Product.destroy({ where: {} });
  });
  it("should create a new product with valid data", async () => {
    const token = jwt.sign(
      { userId: user.id, userRole: "vendor" },
      process.env.SECRET_KEY
    );
    const res = await chai
      .request(app)
      .post("/product/create")
      .send({
        name: "Test Product",
        price: 100,
        quantity: 10,
        available: true,
        category: "Test Category",
        bonus: 1,
        expiryDate: "2023-12-31T00:00:00.000Z",
        ec: 1,
        images: [
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg",
          "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg",
          "https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg",
        ],
      })
      .set("Authorization", `Bearer ${token}`);
    expect(res).to.have.status(201);
    expect(res.body.name).to.equal("Test Product");
    expect(res.body.price).to.equal(100);
    expect(res.body.quantity).to.equal(10);
    expect(res.body.available).to.equal(true);
    expect(res.body.category).to.equal("Test Category");
    expect(res.body.bonus).to.equal(1);
    expect(res.body.expiryDate).to.equal("2023-12-31T00:00:00.000Z");
    expect(res.body.ec).to.equal(1);
    expect(res.body.images).to.have.lengthOf(4);
  });

  it("should return an error if product name already exists", async () => {
    const token = jwt.sign(
      { userId: user.id, userRole: "vendor" },
      process.env.SECRET_KEY
    );
    const res = await chai
      .request(app)
      .post("/product/create")
      .send({
        name: "Test Product",
        price: 100,
        quantity: 10,
        available: true,
        category: "Test Category",
        bonus: 1,
        expiryDate: "2023-12-31",
        ec: 1,
        images: [
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg",
          "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg",
          "https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg",
        ],
      })
      .set("Authorization", `Bearer ${token}`);
    expect(res).to.have.status(409);
    expect(res.body.message).to.equal(
      "Product already exists you can update that product instead"
    );
  });

  it("should return an error if authorization token is missing", async () => {
    const res = await chai
      .request(app)
      .post("/product/create")
      .send({
        name: "Test Product",
        price: 100,
        quantity: 10,
        available: true,
        category: "Test Category",
        bonus: 1,
        expiryDate: "2023-12-31",
        ec: 1,
        images: [
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg",
          "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg",
          "https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg",
        ],
      });
    expect(res).to.have.status(401);
    expect(res.body.message).to.equal("Authorization header missing");
  });
  it("should return an error if unauthorized access", async () => {
    const token = jwt.sign(
      { userId: user.id, userRole: "customer" },
      process.env.SECRET_KEY
    );
    const res = await chai
      .request(app)
      .post("/product/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Product Test",
        price: 100,
        quantity: 10,
        available: true,
        category: "Test",
        bonus: 1,
        expiryDate: "2023-03-16",
        ec: "1234567890123456",
      });
    expect(res).to.have.status(403);
    expect(res.body.message).to.equal("Unauthorized access");
  });
});