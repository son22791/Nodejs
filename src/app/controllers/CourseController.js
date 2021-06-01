const Course = require('../models/Course');
const {
  mongooseToObject
} = require('../../util/mongoose');
class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    // res.send('COURSES DETAIL!!!');
    // https://mongoosejs.com/docs/api.html#model_Model.findOne
    // using callback
    // Adventure.findOne({ country: 'Croatia' }, function (err, adventure) {});
    Course.findOne({
        slug: req.params.slug
      })
      .then(course =>
        res.render('courses/show', {
          courses: mongooseToObject(course)
        })
      )
      .catch(next);
  }

  // [GET] /courses/creates
  create(req, res, next) {
    res.render('courses/create');
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit', {
        course: mongooseToObject(course)
      }))
      .catch(next);
  }
  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({
        _id: req.params.id
      }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({
        _id: req.params.id
      }) //Thực hiện xóa
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[PATCH] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({
        _id: req.params.id
      }) //Thực hiện xóa vĩnh viễn dữ liệu đã xóa
      .then(() => res.redirect('back'))
      .catch(next);
  }
  restore(req, res, next) {
    Course.restore({
        _id: req.params.id
      }) //Thực hiện restore lại dữ liệu đã xóa
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [POST] /courses/store
  store(req, res, next) {
    // res.json(req.body);
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
      const course = new Course(req.body);
      course
        .save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
  }

  // [POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({
            _id: {
              $in: req.body.courseIds
            }
          }) //Thực hiện xóa
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      default:
        res.json({
          message: 'Action is invalid!'
        });
        break;
    }
  };
  handleFormActionsTrash(req, res, next) {
    switch (req.body.action) {
      case 'deleteOne':
        Course.deleteOne({
            _id: {
              $in: req.body.courseIds
            }
          }) //Thực hiện xóa
          .then(() => res.redirect('back'))
          .catch(next);
      case 'restore':
        Course.restore({
            _id: {
              $in: req.body.courseIds
            }
          }) //Thực hiện restore lại dữ liệu đã xóa
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({
          message: 'Action is invalid!'
        });
        break;
    }
  };
}
module.exports = new CourseController();
