const request = require('supertest');
const app = require('./index');  // Ensure the path to your Express app is correct

describe('API tests for the Cheese API', () => {
    // Test for retrieving all cheeses
    test('GET /api/cheeses should return all cheeses', async () => {
        const response = await request(app).get('/api/cheeses');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(5);  // Adjust according to actual number of cheeses
        expect(response.body[0].name).toEqual("BLUE VEIN (AUSTRALIAN)");
    });

    // Test for retrieving a single cheese by ID
    test('GET /api/cheeses/{id} should return a cheese by ID', async () => {
        const response = await request(app).get('/api/cheeses/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual("BLUE VEIN (AUSTRALIAN)");
    });

  
    // Test for deleting a cheese
    test('DELETE /api/cheeses/{id} should delete a cheese', async () => {
        const response = await request(app).delete('/api/cheeses/3'); // Make sure ID 5 exists or adjust accordingly
        expect(response.statusCode).toBe(204);
    });
});



// Run the test with the command: npm test
// With more time creating tests for edge cases such as invalid inputs would be beneficial
// Also, testing the error handling of the API and data validation would be useful.
// validate database state to ensure operations have the intended effect.


