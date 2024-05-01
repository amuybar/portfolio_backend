const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./route/routes');

const app = express();

app.use(cors());  // Enable CORS if needed
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://barryreact:wSyW5VtSV7DAGrh8@cluster0.rjv8a2h.mongodb.net/Portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
