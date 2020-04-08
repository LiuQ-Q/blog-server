'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'api';
  }

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
}

module.exports = MainController;
