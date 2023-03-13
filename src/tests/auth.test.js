import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import models from "../database/models";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;



describe("createUser function", function () {
  before(async function () {
    await models.sequelize.sync();
    await models.User.destroy({where: {}});
    await models.User.create({
      id: uuidv4(),
      firstName: "Kaneza",
      lastName: "Erica",
      userName: "Eriallan",
      telephone: "0785188981",
      address: "Kigali",
      email: "eriman@example.com",
      password: await bcrypt.hash("Password@123", 10),
    });
  });

  it("should create a new user with valid data", async function () {
    const res = await chai.request(app).post("/user/create").send({
      firstName: "Manzi",
      lastName: "Evariste",
      userName: "Manzi212",
      telephone: "0785188981",
      address: "Kiyovu",
      email: "evaristeee@gmail.com",
      password: "Password@123",
    });
    expect(res).to.have.status(201);
    expect(res.body.message).to.equal("Account created successfully");
    expect(res.body.data).to.have.property("id");
    expect(res.body.data.firstName).to.equal("Manzi");
    expect(res.body.data.lastName).to.equal("Evariste");
    expect(res.body.data.userName).to.equal("Manzi212");
    expect(res.body.data.telephone).to.equal("0785188981");
    expect(res.body.data.address).to.equal("Kiyovu");
    expect(res.body.data.email).to.equal("evaristeee@gmail.com");
    expect(res.body).to.have.property("token");
  });

  it("should return an error if email is already in use", async function () {
    const res = await chai.request(app).post("/user/create").send({
      firstName: "Manzi",
      lastName: "Evariste",
      userName: "Manzi212",
      telephone: "0785188981",
      address: "Kiyovu",
      email: "evaristeee@gmail.com",
      password: "Password@123",
    });
    expect(res).to.have.status(400);
  });

  it("should return an error if any required fields are missing", async function () {
    const res = await chai.request(app).post("/users").send({
      firstName: "",
      lastName: "",
      userName: "",
      telephone: "",
      address: "",
      email: "",
      password: "",
    });
    expect(res).to.have.status(404);
  });
});

describe("User Login", () => {
  before(async function () {
    await models.sequelize.sync();
    await models.User.create({
      id: uuidv4(),
      firstName: "Didas",
      lastName: "Junior",
      userName: "Junior",
      telephone: "0790994799",
      address: "Kigali",
      email: "d.gasana@alustudent.com",
      password: await bcrypt.hash("Password@123", 10),
    });
  });

  after(async function () {
    await models.User.destroy({where: {}});
    //await models.sequelize.close();
  });

    it("Should LOGIN a USER", (done) => {
        chai.request(app)
        .post('/user/login')
        .send({
            email: "d.gasana@alustudent.com",
            password: "Password@123",
        })
        .end((err,res) => {
            if(err) done(err);
            else {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message');
                done();
            }
        })
})
    it("it Shouldn't LOGIN a USER who has wrong credentials", (done) => {
        chai.request(app)
        .post('/user/login')
        .send({
            email: "evarist@gmail.com",
            password: "Password@123",
        })
        .end((err,res) => {
            if(err) done(err);
            else {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                done();
            }
        })
    })
    it("it Shouldn't LOGIN a USER who has wrong credentials", (done) => {
        chai.request(app)
        .post('/user/login')
        .send({
            email: "d.gasana@alustudent.com",
            password: "Password@12345",
        })
        .end((err,res) => {
            if(err) done(err);
            else {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                done();
            }
        })
})
})