'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async login() {
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    const sql = `SELECT username FROM admin_user WHERE username='${username}' AND password='${password}'`;

    const res = await this.app.mysql.query(sql);

    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = {
        data: '登录成功',
        openId,
      };
    } else {
      this.ctx.body = {
        data: '登录失败',
      };
    }
  }

  async getTypeInfo() {
    const typeInfo = await this.app.mysql.select('type');
    this.ctx.body = { data: typeInfo };
  }

  async addArticle() {
    const article = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', article);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async updateArticle() {
    const article = this.ctx.request.body;
    const result = await this.app.mysql.update('article', article);
    const updateSuccess = result.affectedRows === 1;

    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.image as image,' +
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d') as addTime," +
              'article.view_count as viewCount,' +
              'type.name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'ORDER BY article.id DESC';

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result,
    };
  }

  async deletArticleById() {
    const articleId = this.ctx.params.id;
    const result = await this.app.mysql.delete('article', { id: articleId });
    this.ctx.body = {
      data: result,
    };
  }

  async getArticleById() {
    const articleId = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.image as image,' +
                'article.content as articleContent,' +
                "FROM_UNIXTIME(article.add_time, '%Y-%m-%d') as addTime," +
                'article.view_count as viewCount,' +
                'type.id as typeId,' +
                'type.name as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.id=' + articleId;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = MainController;
