const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
function route(app) {
  app.use('/news', newsRouter);
  app.use('/me', meRouter);
  // Có mỗi '/' luôn để phía dưới
  app.use('/courses', coursesRouter);
  app.use('/', siteRouter);
  
  // app.get('/', (req, res) => 
  // res.render('home')
  // })
  // app.get('/news', (req, res) => {
  //   res.render('news');
  // });

  //Local host --Hosting

  // Action ---> Dispatcher --> Function handler

  // app.get('/search', (req, res) => {
  //   // console.log(req.query.q);
  //     res.render('search')
  // });
  // app.post('/search', (req, res) => {
  //     // console.log(req.body);
  //     res.send('')
  // });
  // app.get('/news', (req, res) => {
  //   res.render('news');
  // });
}

module.exports = route;
