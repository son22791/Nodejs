const express = require('express');

const router = express.Router();

//Đối tượng khởi tạo từ class NewsController thì viết thường
//Construct function or class thì mới viết hoa chữ cái đầu NewsController
const siteController = require('../app/controllers/SiteController');
// newsController.index
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
