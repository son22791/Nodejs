const express = require('express');
const router = express.Router();
//Đối tượng khởi tạo từ class NewsController thì viết thường
//Construct function or class thì mới viết hoa chữ cái đầu NewsController
const newsController = require('../app/controllers/NewsController');

// newsController.index

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
