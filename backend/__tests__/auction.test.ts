import mongoose from "mongoose" 
import request from "supertest"
import {app} from "../server"


import {config} from 'dotenv'

config()

beforeEach(async ()=>{
    await mongoose.connect(process.env.MONGODB_URI!);
})

afterEach(async () => {
    await mongoose.connection.close();
})


describe("GET /api/signup", ()=>{
    it("should signup User", async () => {
        const res = await request(app).post("http://localhost:8080/auction-api/auction").send({
        "firstname" : "John",
        "lastname" : "Doe",
        "email" : "john@doe.com",
        "phone" : 123455632,
        "password" : "user123"

        });
        expect(res.statusCode).toBe(201);
        expect(res.body._id).toBeGreaterThan(0);
    })
})


describe("GET /api/login", ()=>{
    it("should login User", async () => {
        const res = await request(app).post("/api/auth/login").send({
            "": "",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBeGreaterThan(0);
    })
})