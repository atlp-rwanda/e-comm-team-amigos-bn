import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import models from "../database/models";
import app from "../app";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();
chai.use(chaiHttp);
const should = chai.should();

describe("Chat Feature", () => {
    before(async function () {
        await models.sequelize.sync({ force: true });
        await models.User.create({
          firstName: "Didas",
          lastName: "Junior",
          userName: "Junior",
          telephone: "0790994799",
          address: "Kigali",
          email: "jondoe@alustudent.com",
          password: await bcrypt.hash("Password@123", 10),
        });
      });
    
      after(async function () {
        await models.User.destroy({where: {}});
      });

      it("Should Get All CHATS", (done) => {
            chai
              .request(app)
              .get("/chat")
              .end((error, res) => {
                if (error) done(error);
                else {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.have.property("Chats");
                  done();
                }
              });
          });
      });



