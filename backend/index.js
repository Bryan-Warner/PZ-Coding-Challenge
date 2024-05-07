const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();

// Helmet configuration with enhanced CSP and CORP
app.use(helmet({
  contentSecurityPolicy: {
      directives: {
          defaultSrc: ["'self'"],  // Default setting for all loading content
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],  // Allow fonts from self and Google
          styleSrc: ["'self'", 'https://fonts.googleapis.com'],  // Allow CSS from self and Google
          scriptSrc: ["'self'"],  // Allow scripts from self
          imgSrc: ["'self'", 'http://localhost:3000', 'data:'],  // Allow images from self and data URIs
          baseUri: ["'self'"],  // Restrict base URIs to self
          formAction: ["'self'"],  // Forms can only submit to self
          frameAncestors: ["'self'"],  // Allow frames from self only
          objectSrc: ["'none'"],  // Prevent object embeds
      }
  }
}));

// Allow CORS from any origin for development
app.use(cors({
  origin: '*',  // Adjust this in production for security
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
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
app.get('/api/cheeses', (req, res) => {
  res.json(cheeses);
});

app.get('/api/cheeses/:id', (req, res) => {
  const cheese = cheeses.find(c => c.id === parseInt(req.params.id));
  if (!cheese) {
    res.status(404).send('Cheese not found');
  } else {
    res.json(cheese);
  }
});

app.post('/api/cheeses', (req, res) => {
  const { name, pricePerKilo, color, imageURL } = req.body;
  const cheese = { id: cheeses.length + 1, name, pricePerKilo, color, imageURL };
  cheeses.push(cheese);
  res.status(201).send(cheese);
});

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
    res.send(cheese);
  }
});

app.delete('/api/cheeses/:id', (req, res) => {
  cheeses = cheeses.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Catch-all handler for any other requests not covered above
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  } else {
    res.status(404).send('API route not found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`visit http://localhost to view the app`);
});
