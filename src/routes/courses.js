const express = require('express');
const router = express.Router();
//Đối tượng khởi tạo từ class NewsController thì viết thường
//Construct function or class thì mới viết hoa chữ cái đầu NewsController
const courseController = require('../app/controllers/CourseController');

// newsController.index

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormActions);
router.post('/handle-form-actions-trash', courseController.handleFormActionsTrash);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);
module.exports = router;
