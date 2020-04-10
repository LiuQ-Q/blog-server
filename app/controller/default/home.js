'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '123123123';
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as addTime," +
              'article.view_count as viewCount,' +
              'type.name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    const articleId = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.content as articleContent,' +
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as addTime," +
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

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async getArticleListByTypeId() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as addTime," +
              'article.view_count as viewCount,' +
              'type.name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.type_id=' + id;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }
}

module.exports = HomeController;
