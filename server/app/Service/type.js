"use strict";

const Service = require("egg").Service;

class TypeService extends Service {
  async add(params) {
    const { ctx, app } = this;
    try {
      // 往 bill 表中，插入一条账单数据
      const result = await app.mysql.insert("type", params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取账单列表
  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = "id,name,type";
    let sql = `select ${QUERY_STR} from type where user_id = ${id} or user_id = 0`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async detail(id, user_id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.get("bill", { id, user_id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async update(params) {
    const { ctx, app } = this;
    try {
      let result = await app.mysql.update(
        "bill",
        {
          ...params,
        },
        {
          id: params.id,
          user_id: params.user_id,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async delete(id, user_id) {
    const { ctx, app } = this;
    try {
      let result = await app.mysql.delete("bill", {
        id: id,
        user_id: user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = TypeService;
