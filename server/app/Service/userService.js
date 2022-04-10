"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  // 通过用户名获取用户信息
  async getUserByName(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get("user", { username });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 注册
  async register(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert("user", params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    // 通过 app.jwt.verify 方法，解析出 token 内的用户信息
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 通过 getUserByName 方法，以用户名 decode.username 为参数，从数据库获取到该用户名下的相关信息
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    // userInfo 中应该有密码信息，所以我们指定下面四项返回给客户端
    ctx.body = {
      code: 200,
      msg: "请求成功",
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || "",
        avatar: userInfo.avatar || defaultAvatar,
      },
    };
  }
  // 修改用户信息
  async editUserInfo(params) {
    const { ctx, app } = this;
    try {
      // 通过 app.mysql.update 方法，指定 user 表，
      let result = await app.mysql.update(
        "user",
        {
          ...params, // 要修改的参数体，直接通过 ... 扩展操作符展开
        },
        {
          id: params.id, // 筛选出 id 等于 params.id 的用户
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = UserService;
