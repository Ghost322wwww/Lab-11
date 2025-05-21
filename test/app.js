const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const articles = require('../routes/articles');

app.use(bodyParser()); 
app.use(articles.router.routes());

module.exports = app;