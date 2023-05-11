import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import logger from '../../logger'; // Update the path based on your project structure

chai.use(chaiHttp);
describe('get a message', () => {
    it('test a welcome message', (done) => {
        chai.request(app)
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
describe('Logger Tests', () => {
    
  it('should have transports defined', () => {
    expect(logger.transports).to.be.an('array');
    expect(logger.transports.length).to.be.greaterThan(0);
  });

  it('should have valid format defined', () => {
    expect(logger.format).to.be.an('object');
  });

  it('should have defaultMeta defined', () => {
    expect(logger.defaultMeta).to.be.an('object');
    expect(logger.defaultMeta.service).to.equal('user-service');
  });
});