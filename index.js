const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));

mongoose.set('debug', true);

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/social-network-api';

const options = {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(dbURI, options);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => console.log(` Server is running with localhost:${PORT} `));
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
}); 
