const express = require('express');
const fs = require('fs');
const path = require('path');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require ('../client/src/index.jsx');

const PORT = 8000;
const app = express()

app.use( express.static( path.resolve(__dirname, '../client', 'build') ) );

app.use('^/$', (req, res) => {
    fs.readFile( path.resolve('../client/dist/index.html'), 'utf-8', (err, data) => {
        console.log('data', data);
        if(err) {
            console.log(err);
            return res.status(500).send('Some error')
        }
        return res.send(
            data.replace (
                '<div id="reactApp"></div>',
                `<div id="reactApp">${ ReactDOMServer['renderToString']( <App /> ) }</div>`
            )
        )
    })
})

app.listen(PORT , ()=> {
    console.log(`App run on port ${ PORT }`)
})