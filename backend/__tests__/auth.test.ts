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
        const res = await request(app).post("/api/auth/signup").send({
            
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBeGreaterThan(0);
    })
})