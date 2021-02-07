const express = require('express');
const body = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user')
const portfolioRouter = require('./routes/portfolio')

const app = express();

// use .env file
dotenv.config();

// body-parser
app.use(body.json({ limit: "30mb", extended: true }));
app.use(cors());

app.get((req, res) => {
    res.send('Hello to portfolio API')
})
// use router
app.use('/user', userRouter);
app.use('/portfolio', portfolioRouter);

// Connecting to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server runnin on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//make sure  that we dont get any warning in the console.
mongoose.set('useFindAndModify', false);