import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styles from "./App.module.css";
import InputBox from "./Components/Input";
import TextareaBox from "./Components/Textarea";
import DetailBox from "./Components/Details";

export default function ApplicationForm(props) {
  dayjs.extend(duration);
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const storage = JSON.parse(localStorage.getItem("storage"));
  const ID = storage[0].filter((form) => form.userID === user.userID).length;
  const [appForm, setAppForm] = useState({
    formID: "A" + user.userID + "00" + ID,
    userID: user.userID,
    fillDate: "",
    startTime: "",
    endTime: "",
    tripTime: [0, 0, 0],
    schedule: "",
    leaveType: "",
    pDesc: "",
    projectTitle: "",
    budgetAccount: "",
    area: "",
    estAmount: "",
    estBalance: user.Balance,
    transport: "",
    isVerified: false,
  });
  useEffect(() => {
    var dateInterval = setInterval(() => getDate(), 1000);
    return () => {
      clearInterval(dateInterval);
    };
  });
  const getDate = () => {
    var fillDate = new Date().toLocaleDateString();
    setAppForm((prevState) => {
      return {
        ...prevState,
        fillDate,
      };
    });
  };
  const timeDiff = () => {
    const dateStart = dayjs(appForm.startTime);
    const dateEnd = dayjs(appForm.endTime);
    let dateDiff = dayjs.duration(dateEnd.diff(dateStart));
    let dateDiffDays = dateDiff.asDays();
    let dateDiffHours = dateDiff.hours();
    let dateDiffMinutes = dateDiff.minutes();
    if (isNaN(dateDiffHours && dateDiffMinutes)) {
      dateDiffDays = 0;
      dateDiffHours = 0;
      dateDiffMinutes = 0;
    }
    setAppForm((prevState) => {
      return {
        ...prevState,
        tripTime: [parseInt(dateDiffDays), dateDiffHours, dateDiffMinutes],
      };
    });
  };
  const handleChange = (event) => {
    setAppForm((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleBalance = () => {
    if (appForm.estBalance < 0) {
      alert("您的預估金額已超出您的餘額");
    }
  };
  const handleCount = (event) => {
    let BalanceCopy = user.Balance;
    BalanceCopy = BalanceCopy - event.target.value;
    handleChange(event);
    setAppForm((prevState) => {
      return {
        ...prevState,
        estBalance: BalanceCopy,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (appForm.estBalance < 0) {
      alert("出差申請失敗。您的預估金額已超出您的餘額");
    } else if ((appForm.tripTime[0] || appForm.tripTime[1] || appForm.tripTime[2]) <= 0) {
      alert("出差申請失敗。請輸入正確的出差時數");
    } else {
      alert("出差申請成功");
      navigate("/Home");
      props.parentCallback(appForm);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>出差申請單</h1>
      <div className={styles.flex}>
        <label>表單序號 ：{appForm.formID}</label>
        <label>填單日期 ：{appForm.fillDate}</label>
      </div>
      <div className={styles.form_input}>
        <div className={styles.input_box}>
          <DetailBox title="申請人" content={user.name} />
          <DetailBox title="部門名稱" content={user.departmentName} />
          <DetailBox title="管理類別" content={user.mCategory} />
        </div>
        <div className={styles.input_box}>
          <DetailBox title="到職日" content={user.arrivalDate} />
          <DetailBox title="職稱" content={user.jobTitle} />
          <DetailBox title="計薪類別 (N/H)：" content="一般人員" />
        </div>
      </div>
      <div className={styles.form_input}>
        <div className={styles.input_box}>
          <InputBox title="起始時間" type="datetime-local" name="startTime" value={appForm.startTime} onChange={handleChange} onBlur={timeDiff} />
          <InputBox title="當日班表" type="text" name="schedule" value={appForm.schedule} onChange={handleChange} />
        </div>
        <div className={styles.input_box}>
          <InputBox title="結束時間" type="datetime-local" name="endTime" value={appForm.endTime} onChange={handleChange} onBlur={timeDiff} />
          <DetailBox title="出差時數" content={appForm.tripTime[0] + " 天 " + appForm.tripTime[1] + " 小時 " + appForm.tripTime[2] + " 分鐘"} />
        </div>
        <InputBox title="假別" type="text" name="leaveType" value={appForm.leaveType} onChange={handleChange} />
        <TextareaBox title="事由説明" rows="5" name="pDesc" value={appForm.pDesc} onChange={handleChange} />
      </div>
      <label className={styles.info}>提醒您：出差核銷請於本次出差返回次日起七天內辦理</label>
      <h2 className={styles.sub_title}>計畫部門</h2>
      <div className={styles.form_input}>
        <div className={styles.input_box}>
          <InputBox title="計畫名稱" type="text" name="projectTitle" value={appForm.projectTitle} onChange={handleChange} />
          <InputBox title="預算科目" type="text" name="budgetAccount" value={appForm.budgetAccount} onChange={handleChange} />
          <div className={styles.input_box_full}>
            <label className={styles.input_title}>國內 | 國外</label>
            <div className={styles.radio_input}>
              <input type="radio" name="area" value="國內" onChange={handleChange} required />
              <label htmlFor="domestic">國內</label>
              <input type="radio" name="area" value="國外" onChange={handleChange} required />
              <label htmlFor="overseas">國外</label>
            </div>
          </div>
        </div>
        <div className={styles.input_box}>
          <InputBox title="預估金額" type="number" min="0" name="estAmount" value={appForm.estAmount} onChange={handleCount} onBlur={handleBalance} />
          <div className={styles.input_box_full}>
            <label className={styles.input_title}>預估餘額</label>
            <label className={styles.details}>
              NT$ {user.Balance} - NT$ {appForm.estAmount} = NT$ {appForm.estBalance}
            </label>
          </div>
        </div>
        <TextareaBox title="預定搭乘交通工具" rows="5" name="transport" value={appForm.transport} onChange={handleChange} />
      </div>
      <div className={styles.button}>
        <input type="submit" value="Submit"></input>
      </div>
    </form>
  );
}
