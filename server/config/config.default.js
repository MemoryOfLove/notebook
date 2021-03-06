/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  
  const config = exports = {};
  //csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '123.57.44.123',
      // 端口号
      port: '3306',
      // 用户名
      user: '用户',
      // 密码
      password: '密码', // 初始化密码，没设置的可以不写
      // 数据库名
      database: 'notebook-server', // 数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.jwt = {
    secret: 'jluyeyu',
  };
  config.multipart = {
    mode: 'file'
  };
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1649493741656_1922';

  // add your middleware config here
  config.middleware = [];
  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };

  return {
    ...config,
    ...userConfig,
  };
};

