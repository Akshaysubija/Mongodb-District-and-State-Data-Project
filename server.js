const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const stateRoutes = require('./routes/stateRoutes');
const districtRoutes = require('./routes/districtRoutes');

dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api', stateRoutes);
app.use('/api', districtRoutes);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
