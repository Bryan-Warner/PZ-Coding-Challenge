const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cheese API',
      version: '1.0.0',
      description: 'API documentation for Cheese API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Cheese: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            pricePerKilo: { type: 'number' },
            color: { type: 'string' },
            imageURL: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./index.js'], // Path to the API files containing the Swagger annotations
};

// Initialize Swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Helmet configuration with enhanced CSP and CORP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'http://localhost:3000', 'data:'],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      objectSrc: ["'none'"],
    },
  },
}));

// Allow CORS from any origin for development
app.use(cors({
  origin: '*', // Adjust this in production for security
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to set Cross-Origin-Resource-Policy to cross-origin
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Serve static files from the backend/images directory
app.use('/images', express.static('images'));

// In-memory data storage for cheeses
let cheeses = [
  { id: 1, name: "BLUE VEIN (AUSTRALIAN)", pricePerKilo: 20, color: "Blue", imageURL: "/images/Roaring_Forties_Blue_Cheese.jpg" },
  { id: 2, name: "GOUDA", pricePerKilo: 22, color: "Light Yellow", imageURL: "/images/gouda.jpg" },
  { id: 3, name: "CACIO DE ROMA", pricePerKilo: 16.5, color: "Brownish Yellow", imageURL: "/images/Cacio_de_Roma.jpg" },
  { id: 4, name: "NEUFCHATEL", pricePerKilo: 39.99, color: "White", imageURL: "/images/Neufchatel.jpg" },
  { id: 5, name: "RED WINDSOR", pricePerKilo: 45, color: "Pink and White", imageURL: "/images/red_windsor.jpg" }
];

// API routes

/**
 * @swagger
 * /api/cheeses:
 *   get:
 *     summary: Get all cheeses
 *     description: Retrieve a list of all cheeses.
 *     responses:
 *       200:
 *         description: A list of cheeses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cheese'
 */
app.get('/api/cheeses', (req, res) => {
  res.json(cheeses);
});

/**
 * @swagger
 * /api/cheeses/{id}:
 *   get:
 *     summary: Get a cheese by ID
 *     description: Retrieve a single cheese by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cheese to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested cheese.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cheese'
 *       404:
 *         description: Cheese not found.
 */
app.get('/api/cheeses/:id', (req, res) => {
  const cheese = cheeses.find(c => c.id === parseInt(req.params.id));
  if (!cheese) {
    res.status(404).send('Cheese not found');
  } else {
    res.json(cheese);
  }
});

/**
 * @swagger
 * /api/cheeses:
 *   post:
 *     summary: Create a new cheese
 *     description: Create a new cheese entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cheese'
 *     responses:
 *       201:
 *         description: Successfully created cheese.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cheese'
 */
app.post('/api/cheeses', (req, res) => {
  const { name, pricePerKilo, color, imageURL } = req.body;
  const cheese = { id: cheeses.length + 1, name, pricePerKilo, color, imageURL };
  cheeses.push(cheese);
  res.status(201).json(cheese);
});

/**
 * @swagger
 * /api/cheeses/{id}:
 *   put:
 *     summary: Update a cheese by ID
 *     description: Update the details of a cheese.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cheese to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cheese'
 *     responses:
 *       200:
 *         description: Successfully updated cheese.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cheese'
 *       404:
 *         description: Cheese not found.
 */
app.put('/api/cheeses/:id', (req, res) => {
  const cheese = cheeses.find(c => c.id === parseInt(req.params.id));
  if (!cheese) {
    res.status(404).send('Cheese not found');
  } else {
    const { name, pricePerKilo, color, imageURL } = req.body;
    cheese.name = name;
    cheese.pricePerKilo = pricePerKilo;
    cheese.color = color;
    cheese.imageURL = imageURL;
    res.json(cheese);
  }
});

/**
 * @swagger
 * /api/cheeses/{id}:
 *   delete:
 *     summary: Delete a cheese by ID
 *     description: Delete a cheese entry by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cheese to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted cheese.
 */
app.delete('/api/cheeses/:id', (req, res) => {
  cheeses = cheeses.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Use Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Catch-all handler for any other requests not covered above
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  } else {
    res.status(404).send('API route not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`View the app at http://localhost \nAPI documentation can be viewed at http://localhost:3000/api-docs/json`);
});
module.exports = app;