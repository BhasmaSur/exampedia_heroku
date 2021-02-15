//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
//app.use(express.static('./dist/exampedia'));
app.use(express.static(${__dirname}/exampedia/dist/));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/angular-app-heroku/'}),
// );
app.get('*', (req, res) => {
    res.sendFile(`./exampedia/dist/index.html`); // load the single view file (angular will handle the page changes on the front-end)
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
