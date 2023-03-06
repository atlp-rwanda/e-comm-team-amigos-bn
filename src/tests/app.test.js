import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
describe('get a message', () => {
  it('test a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res).to.have.status(200);
          expect('Content-Type', /html/);
          done();
        }
      });
  });
});
