//Install express server
const express = require('express');
const path = require('path');
//const http = require('http');

const app = express();
app.use(express.static('./dist/ExampediaWeb'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/ExampediaWeb/'}),
);
app.listen(process.env.PORT || 8080);
