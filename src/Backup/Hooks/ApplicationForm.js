import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styles from "./App.module.css";
import InputBox from "./Components/Input";
import DropdownBox from "./Components/Dropdown";
import TextareaBox from "./Components/Textarea";
import DetailBox from "./Components/Details";

const departments = [
  { value: "教務處", label: "教務處" },
  { value: "學務處", label: "學務處" },
  { value: "總務處", label: "總務處" },
  { value: "研究發展處", label: "研究發展處" },
  { value: "電子計算機中心", label: "電子計算機中心" },
  { value: "人事室", label: "人事室" },
  { value: "人文室", label: "人文室" },
  { value: "會計室", label: "會計室" },
];
const departmentList = departments.map((department, key) => (
  <option key={key} name={department.label} value={department.value}>
    {department.label}
  </option>
));

const jobTitles = [
  { value: "會長", label: "會長" },
  { value: "社長", label: "社長" },
  { value: "專務", label: "專務" },
  { value: "常務", label: "常務" },
  { value: "部長", label: "部長" },
  { value: "處長", label: "處長" },
  { value: "主任", label: "主任" },
  { value: "職員", label: "職員" },
  { value: "助理", label: "助理" },
];
const jobTitleList = jobTitles.map((jobTitle, key) => (
  <option key={key} name={jobTitle.label} value={jobTitle.value}>
    {jobTitle.label}
  </option>
));

export default function ApplicationForm(props) {
  dayjs.extend(duration);
  let navigate = useNavigate();
  const [appForm, setAppForm] = useState({
    formID: "0922623170341034245",
    fillDate: "",
    applicant: "",
    jobTitle: "",
    departmentName: "",
    arrivalDate: "",
    mCategory: "",
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
    Balance: 80000,
    estBalance: 80000,
    transport: "",
  });
  useEffect(() => {
    // componentDidMount
    var dateInterval = setInterval(() => getDate(), 1000);
    // returned function => componentWillUnmount
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
    let BalanceCopy = appForm.Balance;
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
      navigate("/");
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
          <InputBox title="申請人" type="text" name="applicant" value={appForm.applicant} onChange={handleChange} />
          <DropdownBox list={departmentList} title="部門名稱" name="departmentName" value={appForm.departmentName} onChange={handleChange} />
          <InputBox title="管理類別" type="text" name="mCategory" value={appForm.mCategory} onChange={handleChange} />
        </div>
        <div className={styles.input_box}>
          <InputBox title="到職日" type="date" name="arrivalDate" value={appForm.arrivalDate} onChange={handleChange} />
          <DropdownBox list={jobTitleList} title="職稱" name="jobTitle" value={appForm.jobTitle} onChange={handleChange} />
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
              NT$ {appForm.Balance} - NT$ {appForm.estAmount} = NT$ {appForm.estBalance}
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
