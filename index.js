var express = require('express');
const cors = require('cors');

var DB = require('./config/db.config');

//Models
require('./models/application.model');
require('./models/component.model');
require('./models/sbom.model');
require('./models/stats.model');
require('./models/user.model');

const applicationRouter = require('./routes/application.route');
const componentRouter = require('./routes/component.route');
const sbomRouter = require('./routes//sbom.route');
const statRouter = require('./routes/stats.route');
const authRouter = require('./routes/auth.route');

const app = express();
DB.connect();

console.log("Database: "+ DB);
// var corsOptions = {
//     origin: 'http://localhost:3000', 'https://sbom-frontend.onrender.com',
//     credentials: true
// }

// app.use(cors(corsOptions));
const allowedOrigins = [
    'http://localhost:3000', 
    'https://sbom-frontend.onrender.com'
];

var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

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
app.use('/api', authRouter);


//set port, listen for requests
const PORT = process.env.PORT || 8080; 

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}.`);
});