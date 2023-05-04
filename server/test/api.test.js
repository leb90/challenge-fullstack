const app = require("../index");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const chai = require("chai");
const axios = require("axios");
const sinon = require('sinon');


chai.use(chaiHttp);
let server;
describe("API Tests", function () {
  before(function (done) {
    if (app) {
      server = app.listen(3031, () => {
        done();
      });
    } else {
      done(new Error("No se pudo iniciar la aplicación"));
    }
  });

  it("should return a valid response when requesting /files/data", function (done) {
    chai
      .request(app)
      .get("/files/data")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should return a 500 error when failing to fetch data from external API", function (done) {
    const axiosGet = axios.get;
    axios.get = function () {
      return Promise.reject(new Error("Mocked error"));
    };
    chai
      .request(app)
      .get("/files/data")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        axios.get = axiosGet;
        done();
      });
  });

  it("should handle errors when requesting /files/data", function (done) {
    const mockError = new Error("Error al obtener la lista de archivos");
    axios.get = sinon.stub().rejects(mockError);

    chai
      .request(app)
      .get("/files/data")
      .end(function (err, res) {
        expect(res).to.have.status(500);
        expect(res.text).to.equal("Hubo un error al procesar la solicitud");
        done();
      });
  });

  after(function (done) {
    server.close(() => {
      done();
    });
  });
});
