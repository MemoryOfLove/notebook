import React, { forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import PopupDate from "@/components/PopupDate";
import cx from "classnames";
import { Popup, Icon, Keyboard, Input, Toast } from "zarm";
import "./index.less";
const PopupAddBill = forwardRef((props, ref) => {
  const dateRef = useRef();
  const [show, setShow] = useState(false); // 内部控制弹窗显示隐藏。
  const [payType, setPayType] = useState("expense"); // 支出或收入类型
  const [date, setDate] = useState(new Date()); // 日期
  const [amount, setAmount] = useState("0"); // 账单金额
  const [currentType, setCurrentType] = useState({}); // 当前选中账单类型
  const [expense, setExpense] = useState([]); // 支出类型数组
  const [income, setIncome] = useState([]); // 收入类型数组
  const [remark, setRemark] = useState(""); // 备注
  const [showRemark, setShowRemark] = useState(false); // 备注输入框

  const handleMoney = (value) => {
    console.log('value', value,amount)
    value = String(value)
    // 点击是删除按钮时
    if (value == 'delete') {
      let _amount = amount.slice(0, amount.length - 1)
      setAmount(_amount.toString())
      return
    }
    // 点击确认按钮时
    if (value == 'ok') {
      if (value == 'ok') {
       // addBill()
        return
      }
      return
    }
    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (value == '.' && amount.includes('.')) return
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
    // amount += value
    setAmount(`${amount}${value}`)
  };
  const changeType = (type) => {
    setPayType(type);
  };

  // 日期选择回调
  const selectDate = (val) => {
    setDate(val);
  };
  // 通过 forwardRef 拿到外部传入的 ref，并添加属性，使得父组件可以通过 ref 控制子组件。
  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      },
    };
  }

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className="add-wrap">
        {/* 右上角关闭弹窗 */}
        <header className="header">
          <span className="close" onClick={() => setShow(false)}>
            <Icon type="wrong" />
          </span>
        </header>
        {/* 「收入」和「支出」类型切换 */}
        <div className="filter">
          <div className="type">
            <span
              onClick={() => changeType("expense")}
              className={cx({
                ["expense"]: true,
                ["active"]: payType == "expense",
              })}
            >
              支出
            </span>
            <span
              onClick={() => changeType("income")}
              className={cx({
                ["income"]: true,
                ["active"]: payType == "income",
              })}
            >
              收入
            </span>
          </div>
          <div
            className="time"
            onClick={() => dateRef.current && dateRef.current.show()}
          >
            {dayjs(date).format("MM-DD")}{" "}
            <Icon className="arrow" type="arrow-bottom" />
          </div>
        </div>
        <div className="money">
            <span className="sufix">¥</span>
            <span className={cx("amount", "animation")}>{amount}</span>
          </div>
        <PopupDate ref={dateRef} onSelect={selectDate} />

        <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
      </div>
    </Popup>
  );
});

export default PopupAddBill;
