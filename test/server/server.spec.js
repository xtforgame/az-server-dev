/*eslint-disable no-unused-vars, no-undef */

import chai from 'chai';
import https from 'https';
import sinon from 'sinon';
import { httpsPort } from 'server/core/config';
import Server from 'server';
import {
  runningMode,
} from 'common/core/config';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let expect = chai.expect;

describe('Server Test Cases', function(){
  describe('Mode', function(){
    it('should be in test mode', (done) => {
      expect(runningMode).to.equal('Test');
      done();
    });
  });

  describe('Basic', function(){
    this.timeout(30000);
    let server = null;
    let stubs = [];
    beforeEach(() => {
      let originalFunc = Server.prototype.start;
      let stub = sinon.stub(Server.prototype, 'start')
      .callsFake(function(...args) {
        // console.log('callsFake');
        return originalFunc.apply(this, ...args);
      });
      stubs.push(stub);
      server = new Server();
      return server.start();
    });

    afterEach(() => {
      stubs.map(stub => {
        stub.restore();
      });
      return server.destroy()
      .then(() => {
        server = null;
      });
    });

    it('should be able to start', () => {
      return new Promise((resolve, reject) => {
        https.get(`https://localhost:${httpsPort}/api`, (res) => {
          const { statusCode } = res;

          if (statusCode !== 200) {
            return reject({ statusCode })
          }

          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            expect(rawData).to.equal('test');
            return resolve(rawData);
          });
        }).on('error', (error) => {
          return reject({ error })
        });
      });
    });

  });
});


