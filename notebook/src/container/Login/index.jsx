import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cell, Input, Button, Checkbox, Toast } from "zarm";
import { post } from "utils";
import CustomIcon from "@/components/CustomIcon";
import Captcha from "react-captcha-code";
import cx from "classnames";
import "./index.less";

const Login = () => {
  const captchaRef = useRef();
  const navigateTo = useNavigate();
  const handleChange = useCallback((v) => {
    setCaptcha(v);
  }, []);
  const [captcha, setCaptcha] = useState(""); // 验证码变化后存储值
  const [username, setUsername] = useState(""); // 账号
  const [password, setPassword] = useState(""); // 密码
  const [verify, setVerify] = useState(""); // 验证码
  const [agree, setAgree] = useState(false); // 验证码
  const [type, setType] = useState("login"); // 登录注册类型

  const handleRef = (ref) => {
    captchaRef.current = ref.current;
  };
  const hancleAgreeChange=(e)=>{
    console.log(e);
    setAgree(value=>!value);
  }
  const handleClick = () => {
    // 主动调用click，用于更换验证码
    captchaRef.current?.click();
  };
  const onSubmit = async () => {
    if (!username) {
      Toast.show("请输入账号");
      return;
    }
    if (!password) {
      Toast.show("请输入密码");
      return;
    }

    if(type=='register'){
      if (!verify) {
        Toast.show("请输入验证码");
        return;
      }
      if (verify != captcha) {
        Toast.show("验证码错误");
        return;
      }
      try {
        const { data } = await post("/user/register", {
          username,
          password,
        });
        Toast.show("注册成功");
      } catch (error) {
        Toast.show(`Error:${error.msg}`);
      }
    }else if(type=='login'){
      try {
        const { data } = await post("/user/login", {
          username,
          password,
        });
      Toast.show("登录成功");
        // 将 token 写入 localStorage
      localStorage.setItem('token', data.token);
      navigateTo('/');

      } catch (error) {
        Toast.show(`Error:${error.msg}`);
      }
    }

  };
  return (
    <div className="auth">
      <div className="head"></div>
      <div className="tab">
        <span
          className={cx({ ["avtive"]: type == "login" })}
          onClick={() => setType("login")}
        >
          登录
        </span>
        <span
          className={cx({ ["avtive"]: type == "register" })}
          onClick={() => setType("register")}
        >
          注册
        </span>
      </div>
      <div className="form">
        <Cell icon={<CustomIcon type="zhanghao" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={(value) => setUsername(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={(value) => setPassword(value)}
          />
        </Cell>
        {type == "register" ? (
          <Cell icon={<CustomIcon type="yanzhengma" />}>
            <Input
              clearable
              type="text"
              placeholder="请输入验证码"
              onChange={(value) => setVerify(value)}
            />
            <Captcha
              charNum={4}
              onClick={handleClick}
              onChange={handleChange}
              onRef={handleRef}
            />
          </Cell>
        ) : null}
      </div>
      <div className="operation">
        {type == "register" ? (
          <div className="agree" onChange={hancleAgreeChange}>
            <Checkbox 
            checked={agree}
            />
            <label className="text-light">
              阅读并同意<a>《服务条款》</a>
            </label>
          </div>
        ) : null}
        <Button block theme="primary" onClick={onSubmit}  disabled={agree}>
          {type=='register'?'注册':'登录'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
