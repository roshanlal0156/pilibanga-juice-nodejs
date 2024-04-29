const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes')
const apiRoutes = require('./src/routes/apiRoutes')
const { requireAuth, checkUser } = require('./src/middleware/authMiddleware');
const app = express();
require('dotenv').config()

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.set('strictQuery', false);
   const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/order', requireAuth, (req, res) => res.render('order'));
app.use(authRoutes);
app.use(apiRoutes);
