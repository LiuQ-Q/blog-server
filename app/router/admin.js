'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/deletArticleById/:id', adminauth, controller.admin.main.deletArticleById);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
};
