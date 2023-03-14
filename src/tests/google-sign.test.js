import chai, { expect, request } from 'chai';
import chaiHttp from 'chai-http';
import { afterEach, beforeEach } from 'mocha';
import app from '../app';
import { successGoogleLogin, failureGogleLogin } from '../controllers/token.controller';

import sinon from "sinon";
import jwt from "jsonwebtoken";
import model from "./../database/models";

chai.use(chaiHttp);
describe('TEST GOOGLE SIGN IN', () => {
    let request, response;
    beforeEach(() => {
        request = {
            user: {
                id: '100166329334870886300',
                displayName: 'Cyusa Kheven',
                name: { familyName: 'Kheven', givenName: 'Cyusa' },
                emails: [{ value: 'cyusa.khevin100@gmail.com', verified: true }],
                photos: [
                    {
                        value: 'https://lh3.googleusercontent.com/a/AGNmyxaiktI_ev7JcGGlWKudRqGvogG33rU4EGInMP_DkA=s96-c'
                    }
                ],
                provider: 'google',
                _raw: '{\n' +
                    '  "sub": "100166329334870886300",\n' +
                    '  "name": "Cyusa Kheven",\n' +
                    '  "given_name": "Cyusa",\n' +
                    '  "family_name": "Kheven",\n' +
                    '  "picture": "https://lh3.googleusercontent.com/a/AGNmyxaiktI_ev7JcGGlWKudRqGvogG33rU4EGInMP_DkA\\u003ds96-c",\n' +
                    '  "email": "cyusa.khevin100@gmail.com",\n' +
                    '  "email_verified": true,\n' +
                    '  "locale": "en-GB"\n' +
                    '}',
                _json: {
                    sub: '100166329334870886300',
                    name: 'Cyusa Kheven',
                    given_name: 'Cyusa',
                    family_name: 'Kheven',
                    picture: 'https://lh3.googleusercontent.com/a/AGNmyxaiktI_ev7JcGGlWKudRqGvogG33rU4EGInMP_DkA=s96-c',
                    email: 'cyusa.khevin100@gmail.com',
                    email_verified: true,
                    locale: 'en-GB'
                }
            }
        };
        response = {};
    });
    afterEach(() => {
        request = null;
        response = null;
    });
    // it('Get Google sign page', (done) => {
    //     chai
    //         .request(app)
    //         .get('/token/google')
    //         .end((err, res) => {
    //             if (err) done(err);
    //             else {
    //                 expect(res).to.have.status(200);
    //                 expect('Content-Type', /html/);
    //                 done();
    //             }
    //         });
    // });
    it('Redirects to Login if user in null', (done) => {
        chai
            .request(app)
            .get('/token/auth/callback/success')
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res).to.have.status(400);
                    expect('Content-Type', "application/json");
                    done();
                }
            });
    });
});

describe('Google Auth', () => {
    describe('successGoogleLogin function', () => {
        it('should return a success response when the user is found', async function () {
            const req = {
                user: {
                    _json: {
                        email: 'cyusa.khevin100@gmail.com',
                        email_verified: true,
                    },
                },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };
            sinon.stub(model.User, 'findOne').resolves({
                dataValues: {
                    email: 'cyusa.khevin100@gmail.com',
                    role: 'vendor',
                },
            });
            const signSpy = sinon.spy(jwt, 'sign');
            await successGoogleLogin(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                message: 'success',
            })).to.be.false;
            expect(signSpy.calledWith(sinon.match.object, process.env.SECRET_KEY)).to.be.true;
            model.User.findOne.restore();
            jwt.sign.restore();
        });
    });
});