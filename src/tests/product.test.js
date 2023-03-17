import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import models from "../database/models";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

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
      id: uuid(),
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
