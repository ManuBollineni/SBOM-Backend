var express = require('express');
const cors = require('cors');

var DB = require('./config/db.config');

//Models
require('./models/application.model');
require('./models/component.model');
require('./models/sbom.model');
require('./models/stats.model');

const applicationRouter = require('./routes/application.route');
const componentRouter = require('./routes/component.route');
const sbomRouter = require('./routes//sbom.route');
const statRouter = require('./routes/stats.route');

const app = express();
DB.connect();

console.log("Database: "+ DB);
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));
// sample route
app.get('/api',(req, res) => {
    res.json({message: 'Welcome to SBOM'});
});

//Routes
app.use('/api', applicationRouter);
app.use('/api', componentRouter);
app.use('/api', sbomRouter);
app.use('/api', statRouter);


//set port, listen for requests
const PORT = process.env.port || 8080;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}.`);
});