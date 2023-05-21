import React, { Component } from "react";
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

export default class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    // 初始化輸入框的 state 值為空
    this.state = {
      formID: "0922623170341034245",
      fillDate: "",
      applicant: "",
      jobTitle: "",
      departmentName: "",
      arrivalDate: "",
      mCategory: "",
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCount = this.handleCount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = () => {
    this.dateInterval = setInterval(() => this.getDate(), 1000);
  };
  componentWillUnmount = () => {
    clearInterval(this.dateInterval);
  };
  getDate = () => {
    var fillDate = new Date().toLocaleDateString();
    this.setState({ fillDate });
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleBalance = () => {
    if (this.state.estBalance < 0) {
      alert("您的預估金額已超出您的餘額");
    }
  };
  handleCount(event) {
    let BalanceCopy = this.state.Balance;
    BalanceCopy = BalanceCopy - event.target.value;
    this.handleChange(event);
    this.setState({ estBalance: BalanceCopy });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.estBalance < 0) {
      alert("您的預估金額已超出您的餘額");
    } else {
      alert("出差申請成功");
      this.props.parentCallback(this.state);
    }
  }
  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <h1 className={styles.title}>出差申請單</h1>
        <div className={styles.flex}>
          <label>表單序號 ：{this.state.formID}</label>
          <label>填單日期 ：{this.state.fillDate}</label>
        </div>
        <div className={styles.form_input}>
          <div className={styles.input_box}>
            <InputBox title="申請人" type="text" name="applicant" value={this.state.applicant} onChange={this.handleChange} />
            <DropdownBox list={departmentList} title="部門名稱" name="departmentName" value={this.state.departmentName} onChange={this.handleChange} />
            <InputBox title="管理類別" type="text" name="mCategory" value={this.state.mCategory} onChange={this.handleChange} />
          </div>
          <div className={styles.input_box}>
            <InputBox title="到職日" type="date" name="arrivalDate" value={this.state.arrivalDate} onChange={this.handleChange} />
            <DropdownBox list={jobTitleList} title="職稱" name="jobTitle" value={this.state.jobTitle} onChange={this.handleChange} />
            <DetailBox title="計薪類別 (N/H)：" content="一般人員" />
          </div>
        </div>
        <h3 className={styles.sub_title}>出差時間：2022/06/26 上午 08:00 ~ 2022/06/26 下午 12:00</h3>
        <div className={styles.form_input}>
          <InputBox title="當日班表" type="text" name="schedule" value={this.state.schedule} onChange={this.handleChange} />
          <InputBox title="假別" type="text" name="leaveType" value={this.state.leaveType} onChange={this.handleChange} />
          <TextareaBox title="事由説明" name="pDesc" value={this.state.pDesc} onChange={this.handleChange} />
        </div>
        <label className={styles.info}>提醒您：出差核銷請於本次出差返回次日起七天內辦理</label>
        <h3 className={styles.sub_title}>計畫部門</h3>
        <div className={styles.form_input}>
          <div className={styles.input_box}>
            <InputBox title="計畫名稱" type="text" name="projectTitle" value={this.state.projectTitle} onChange={this.handleChange} />
            <InputBox title="預算科目" type="text" name="budgetAccount" value={this.state.budgetAccount} onChange={this.handleChange} />
            <div className={styles.input_box_full}>
              <label className={styles.input_title}>國內 | 國外</label>
              <div className={styles.radio_input}>
                <input type="radio" name="area" value="國內" onChange={this.handleChange} required />
                <label htmlFor="domestic">國內</label>
                <input type="radio" name="area" value="國外" onChange={this.handleChange} required />
                <label htmlFor="overseas">國外</label>
              </div>
            </div>
          </div>
          <div className={styles.input_box}>
            <InputBox title="預估金額" type="number" min="0" name="estAmount" value={this.state.estAmount} onChange={this.handleCount} onBlur={this.handleBalance} />
            <div className={styles.input_box_full}>
              <label className={styles.input_title}>預估餘額</label>
              <label className={styles.details}>
                NT$ {this.state.Balance} - NT$ {this.state.estAmount} = NT$ {this.state.estBalance}
              </label>
            </div>
          </div>
          <TextareaBox title="預定搭乘交通工具" name="transport" value={this.state.transport} onChange={this.handleChange} />
        </div>
        <div className={styles.button}>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    );
  }
}
