import * as chai from "chai";
import * as express from "express";
import * as supertest from "supertest";
import { User } from "../app/models/User.model";
import { JWTService } from "../app/services/Jwt.service";
import { UserService } from "../app/services/User.service";
import { Server } from "../config/Server";

let token: string;
let IdRecord: number;
let IdRecordTwo: number;
const server: Server = new Server();
let app: express.Application;

describe("User route", () => {

    before((done) => {

        const user = new User();
        user.username = "username";
        user.keypass = "keypass";
        user.email = "email@email.com";
        user.urlPict = "urlPict";
        user.description = "description";
        user.ranking = 1000;

        server.Start().then(() => {
            app = server.App();
            Promise.all([
                JWTService.signToken({name: "name", role: "rol"}),
                UserService.Save(user),
            ]).then((res) => {
                token = res[0];
                IdRecord = res[1].id;
                done();
            });
        });
    });

    after(async () => {
        const userOne = await UserService.FindOneById(IdRecord);
        const userTwo = await UserService.FindOneById(IdRecordTwo);
        if (userOne) {
            await UserService.Remove(userOne);
        }
        if (userTwo) {
            await UserService.Remove(userTwo);
        }
    });

    it("Random Url gives 404", (done) => {
        supertest(app).get("/random-url")
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.be.a("number");
                chai.expect(res.status).to.eq(404);
                done();
            });
    });

    it("Can list all Users", (done) => {
        supertest(app).get("/")
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.be.a("number");
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("array");
                chai.expect(res.body[0].text).to.be.a("string");
                done();
            });
    });

    it("Can search for Users by Id", (done) => {
        supertest(app).get(`/${IdRecord}`)
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("object");
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.text).to.be.a("string");
                done();
            });
    });

    it("Can create a new User", (done) => {
        supertest(app).post("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({text: "User text 100"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.id).to.be.a("number");
                chai.expect(res.body.text).to.be.a("string");
                IdRecordTwo = res.body.id;
                done();
            });
    });

    it("Can update an existing User", (done) => {
        supertest(app).put("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord, text: "User text updateado"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                done();
            });
    });

    it("Can remove a user by Id", (done) => {
        supertest(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(204);
                done();
            });
    });

    it("Reports an error when finding a non-existent User by Id", (done) => {
        supertest(app).get(`/9999`)
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("NOT FOUND");
                done();
            });
    });

    it("Reports an error when trying to create an invalid User", (done) => {
        supertest(app).post("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({user: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("Reports an error when trying to update a User with invalid data", (done) => {
        supertest(app).put("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({user: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("Reports an error when trying to delete a User with invalid data", (done) => {
        supertest(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({user: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                done();
            });
    });

});
