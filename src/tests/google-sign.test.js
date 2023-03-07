import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
describe('TEST GOOGLE SIGN IN', () => {
    it('Get Google sign page', (done) => {
        chai
            .request(app)
            .get('/token/google')
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