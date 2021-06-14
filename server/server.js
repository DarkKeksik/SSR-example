// import express from 'express'
// import fs from 'fs'
// import path from 'path'
//
// import React from 'react'
// import ReactDOMServer from 'react-dom/server';
// import App from '../client/src'
//
// const PORT = 8000;
// const app = express()
//
// app.use('^/$', (req, res, next) => {
//     fs.readFile( path.resolve('../client/build/index.html'), 'utf-8', (err, date) => {
//         if(err) {
//             console.log(err);
//             return res.status(500).send('Some error')
//         }
//         return res.send(
//             data.replace (
//                 '<div id="reactApp"></div>',
//                 `<div id="reactApp">${ ReactDOMServer.renderToString( <App /> ) }</div>`
//             )
//         )
//     })
// })
//
// app.use(
//     express.static( path.resolve(__dirname, '../client', 'build') )
// )
//
// app.listen(PORT , ()=> {
//     console.log(`App run on port ${ PORT }`)
// })