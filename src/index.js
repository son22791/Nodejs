const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const port = 3000;
const path = require('path');
const SortMiddleware =require('./app/middlewares/SortMiddleware')
const route = require('./routes');
const db = require('./config/db');

//Connect to db
db.connect();

//static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
); //Xử lí dạng form
app.use(express.json()); //Gửi từ code javascript lên để xử lý thì có dạng express.json
app.use(methodOverride('_method'));

//Custom Middleware
app.use(SortMiddleware);
// XMLHttpRequest, fetch, axios, gửi dữ liệu theo phương thức GET và POST lên sever đều được chứ không phải gửi lên theo dạng form nữa

//HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b)=> a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'oi oi-elevator',
          asc :'oi oi-sort-ascending',
          desc :'oi oi-sort-descending',
        };
        const types = {
          default: 'desc',
          asc :'desc',
          desc :'asc',
        }
        const icon = icons[sortType];
        const type =types[sortType];
        return `<a href="?_sort&column=${field}&type=${type}">
        <span class= "${icon}"></span>
        </a>`; 
      }
  }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Routes init
route(app);

// app.get('/', (req, res) => {
//   res.render('home');
// });
// // app.get('/news', (req, res) => {
// //   res.render('news');
// // });

// //Local host --Hosting

// // Action ---> Dispatcher --> Function handler

// app.get('/search', (req, res) => {
//   // console.log(req.query.q);
//   res.render('search');
// });
// app.post('/search', (req, res) => {
//   console.log(req.body);
//   res.send('');
// });
// // app.get('/news', (req, res) => {
// //   console.log(req.query.q);
// //   res.render('news');
// // });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
