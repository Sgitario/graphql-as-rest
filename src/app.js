const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const fetch = require('node-fetch');

const HOST = 'http://localhost';
const PORT = 4000
const PATH = '/graphql';
const APP_URL = HOST + ':' + PORT + PATH;

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log('Server running at ' + APP_URL);
});