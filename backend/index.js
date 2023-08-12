const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors=require('cors');
const formRoutes = require('./routes/form.route');
const userRoutes = require('./routes/user.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/form', formRoutes);
app.use('/api/users', userRoutes );

app.listen(4000, () => {
  console.log('Server is listening on port 4000 to');
});