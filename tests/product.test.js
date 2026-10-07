const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Product = require("../models/Product");

describe("Product API CRUD Tests", () => {

    beforeAll(async () => {
        await Product.deleteMany({ pid: "TEST001" });
    });

    afterAll(async () => {
        await Product.deleteMany({ pid: "TEST001" });
        await mongoose.connection.close();
    });

    // CREATE
    test("POST /api/products - Create product", async () => {
        const response = await request(app)
            .post("/api/products")
            .send({
                pid: "TEST001",
                pname: "Test Laptop",
                price: 15000000,
                quantity: 10
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.pid).toBe("TEST001");
        expect(response.body.pname).toBe("Test Laptop");
    });

    // READ
    test("GET /api/products/TEST001 - Read product", async () => {
        const response = await request(app)
            .get("/api/products/TEST001");

        expect(response.statusCode).toBe(200);
        expect(response.body.pid).toBe("TEST001");
        expect(response.body.pname).toBe("Test Laptop");
        expect(response.body.quantity).toBe(10);
    });

    // UPDATE
    test("PUT /api/products/TEST001 - Update product", async () => {
        const response = await request(app)
            .put("/api/products/TEST001")
            .send({
                pname: "Updated Laptop",
                price: 18000000,
                quantity: 15
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.pname).toBe("Updated Laptop");
        expect(response.body.price).toBe(18000000);
        expect(response.body.quantity).toBe(16);
    });

    // DELETE
    test("DELETE /api/products/TEST001 - Delete product", async () => {
        const response = await request(app)
            .delete("/api/products/TEST001");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Product deleted successfully"
        );
    });

});