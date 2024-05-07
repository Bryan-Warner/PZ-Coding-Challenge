const request = require('supertest');
const express = require('express');
const router = require('./index'); // Import the router

const app = express();
app.use(express.json()); // Parse JSON bodies

app.use('/api', router); // Mount the router under the /api path

describe('API Endpoint Testing', () => {
    // Test for GET all cheeses
    it('should get all cheeses', async () => {
        const res = await request(app).get('/api/cheeses');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(5); // Expects 5 cheeses
    });

    // Test fetching each cheese by ID
    [1, 2, 3, 4, 5].forEach(id => {
        it(`should fetch cheese with ID ${id}`, async () => {
            const res = await request(app).get(`/api/cheeses/${id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.id).toEqual(id);
        });
    });

    // Test for POSTing a new cheese
    it('should create a new cheese', async () => {
        const newCheese = {
            name: "Camembert", 
            pricePerKilo: 28, 
            color: "Creamy", 
            imageURL: "/images/camembert.jpg"
        };
        const res = await request(app).post('/api/cheeses').send(newCheese);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Camembert');
        expect(res.body.pricePerKilo).toEqual(28);
        expect(res.body.color).toEqual('Creamy');
        expect(res.body.imageURL).toEqual("/images/camembert.jpg");
    });

    // Test for PUT updating a cheese
    it('should update a cheese', async () => {
        const updates = {
            name: "Updated Red Windsor", 
            pricePerKilo: 47, 
            color: "Updated Pink and White", 
            imageURL: "/images/updated_red_windsor.jpg"
        };
        const res = await request(app).put('/api/cheeses/5').send(updates);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Updated Red Windsor');
        expect(res.body.pricePerKilo).toEqual(47);
        expect(res.body.color).toEqual('Updated Pink and White');
        expect(res.body.imageURL).toEqual("/images/updated_red_windsor.jpg");
    });

    // Test for DELETE a cheese
    it('should delete a cheese', async () => {
        const res = await request(app).delete('/api/cheeses/5');
        expect(res.statusCode).toEqual(204);
    });
});

// Run the test with the command: npm test
// With more time creating tests for edge cases such as invalid inputs would be beneficial
// Also, testing the error handling of the API and data validation would be useful.
// validate database state to ensure operations have the intended effect.

module.exports = app; // Export the app for testing purposes
