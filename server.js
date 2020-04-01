// Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist diretory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Herokuport
app.listen(process.env.PORT || 8080);