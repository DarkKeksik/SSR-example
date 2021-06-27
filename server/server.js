// For the server build
import express from 'express';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';

// For the client build
import React from 'react';
// import App from '../client/src/index.jsx';

const PORT = 8000;
const app = express();

app.use( express.static( path.resolve(__dirname, '/client', 'src') ) );

app.use('^/$', (req, res) => {
    fs.readFile( path.resolve(__dirname,  'client/src', 'index.html'), 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Some error')
        }
        return res.send(
            data.replace (
                '<div id="reactApp"></div>',
                `<div id="reactApp">123</div>`
            )
        )
    })
})

app.listen(PORT, () => {
    console.log(`App run on port ${ PORT }`)
})