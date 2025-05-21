const Router = require('@koa/router');
const router = new Router({
  prefix: '/api/v1/articles'
});
const bodyParser = require('koa-bodyparser');

const articles = [
  {
    id: 1,
    title: "title 1",
    alltext: "some stuff",
    summary: null,
    datecreated: "0022-01-01T00:00:00.000Z",
    datemodified: "0022-01-01T00:00:00.000Z",
    imageurl: null,
    published: null,
    authorid: 1
  }
];

// GET all
router.get('/', async (ctx) => {
  ctx.body = articles;
});

// GET by ID
router.get('/:id', async (ctx) => {
  const id = parseInt(ctx.params.id);
  const article = articles.find(a => a.id === id);
  if (!article) {
    ctx.status = 404;
    ctx.body = { error: "Article not found" };
    return;
  }
  ctx.body = article;
});

// POST
router.post('/', async (ctx) => {
  const newArticle = ctx.request.body;

  if (!newArticle.title || !newArticle.alltext) {
    ctx.status = 400;
    ctx.body = { error: "Missing required fields" };
    return;
  }

  newArticle.id = articles.length + 1;
  articles.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;
});

// PUT
router.put('/:id', async (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: "Article not found" };
    return;
  }

  const updated = ctx.request.body;
  articles[index] = { ...articles[index], ...updated };
  ctx.body = articles[index];
});

// DELETE
router.delete('/:id', async (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: "Article not found" };
    return;
  }

  const deleted = articles.splice(index, 1);
  ctx.body = deleted[0];
});

module.exports = {
  router
};
