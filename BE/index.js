const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

const JWT_SECRET = 'f852a76cf47bce8bb7bfc7cd6b9cce2bfb4f8b0da2eebacef0309711f905a97b2713f190c22d6c6f2715bce04a9c12c9a4789f0afbe8ed308f8e73e0c2017450';
const REFRESH_TOKEN_SECRET = '48cf7d20e5ee14d26bc6d9964d99153fbeb384f852ea5002dbcd1188df6f774581f2e81647dfff677436a3dace877a0518843035d1bdd23fe6f6ef743cd6d14c';

app.use(cors());
app.use(bodyParser.json());

let users = [
  {
    id: 1,
    username: 'admin',
    password: 'password123',
  },
];

let products = [
  {
    id: 1,
    name: 'Red T-Shirt',
    description: 'A comfortable red t-shirt.',
    price: 19.99,
    currency: 'USD',
    images: ['https://placehold.co/600x400'],
    category: 'Apparel',
    customAttributes: {
      size: 'M',
      color: 'Red',
      material: 'Cotton',
    },
  },
  {
    id: 2,
    name: 'Wooden Dining Table',
    description: 'A sturdy wooden dining table that seats six.',
    price: 499.99,
    currency: 'USD',
    images: ['https://placehold.co/400x400'],
    category: 'Furniture',
    customAttributes: {
      material: 'Oak',
      dimensions: '200x100x75 cm',
    },
  },
  {
    id: 3,
    name: 'Bluetooth Headphones',
    description: 'Wireless headphones with noise cancellation.',
    price: 129.99,
    currency: 'USD',
    images: ['https://placehold.co/500x400'],
    category: 'Electronics',
    customAttributes: {
      brand: 'SoundMagic',
      batteryLife: '20 hours',
    },
  },
];

let currentId = 4;
let currentUserId = 2;
let refreshTokens = [];

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username already taken' });
  }
  const newUser = {
    id: currentUserId++,
    username,
    password,
  };
  users.push(newUser);
  res.json({ success: true, message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ success: true, accessToken, refreshToken });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token missing' });
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ success: false, message: 'Invalid refresh token' });
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid refresh token' });
    }
    const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ success: true, accessToken });
  });
});

app.delete('/api/auth/logout', (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.json({ success: true, message: 'Logged out successfully' });
});

app.use('/api/products', authenticateToken);

app.post('/api/products', (req, res) => {
  const product = {
    id: currentId++,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    currency: req.body.currency,
    images: req.body.images || [],
    category: req.body.category,
    customAttributes: req.body.customAttributes || {},
  };
  products.push(product);
  res.json({ success: true, data: product });
});

app.get('/api/products/search', (req, res) => {
  let result = products;

  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    result = result.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(q);
      const categoryMatch = product.category.toLowerCase().includes(q);

      const customAttributesMatch = Object.values(product.customAttributes).some((value) => value.toLowerCase().includes(q));

      return nameMatch || categoryMatch || customAttributesMatch;
    });
  }

  res.json({ success: true, data: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (product) {
    res.json({ success: true, data: product });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id == req.params.id);
  if (index !== -1) {
    const existingProduct = products[index];
    const updatedProduct = { ...existingProduct, ...req.body };

    if (req.body.customAttributes) {
      updatedProduct.customAttributes = {
        ...existingProduct.customAttributes,
        ...req.body.customAttributes,
      };
    }

    products[index] = updatedProduct;
    res.json({ success: true, data: updatedProduct });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id == req.params.id);
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ success: true, message: 'Product deleted successfully.' });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
