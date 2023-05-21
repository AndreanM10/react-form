import React, { Component } from "react";
import styles from "./App.module.css";
import InputBox from "./Components/Input";
import TextareaBox from "./Components/Textarea";
import DetailBox from "./Components/Details";

export default class VerificationForm extends Component {
  constructor(props) {
    super(props);
    // 初始化輸入框的 state 值為空
    this.state = {
      formID: "743410126205292",
      fillDate: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      workPlace: "",
      vocationName: "",
      tripHour: "",
      businessTrip: "",
      businessReport: "",
      totalExpenses: "",
      expenseList: [
        {
          expenseCurrency: "",
          expensedesc: "",
          jtC: 0,
          qzC: 0,
          szC: 0,
          zsC: 0,
          qtC: 0,
          C_Total: 0,
          jtNTD: 0,
          qzNTD: 0,
          szNTD: 0,
          zsNTD: 0,
          qtNTD: 0,
          NTD_Total: 0,
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
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
  // --
  handleAdd = (event) => {
    event.preventDefault();
    const expenseState = {
      expenseCurrency: "",
      expensedesc: "",
      jtC: 0,
      qzC: 0,
      szC: 0,
      zsC: 0,
      qtC: 0,
      C_Total: 0,
      jtNTD: 0,
      qzNTD: 0,
      szNTD: 0,
      zsNTD: 0,
      qtNTD: 0,
      NTD_Total: 0,
    };
    let expenseListCopy = [...this.state.expenseList];
    expenseListCopy.push(expenseState);
    this.setState({ expenseList: expenseListCopy });
  };
  handleChangeExpense(key, event) {
    let expenseListCopy = [...this.state.expenseList];
    expenseListCopy[key][event.target.name] = event.target.value;
    this.setState({ expenseList: expenseListCopy });
  }
  handleClickBlank(key, event) {
    let expenseListCopy = [...this.state.expenseList];
    if (event.target.value === "0") {
      expenseListCopy[key][event.target.name] = "";
      this.setState({ expenseList: expenseListCopy });
    }
  }
  handleCountC(key, event) {
    let expenseListCopy = [...this.state.expenseList];
    let total = 0;
    if (event.target.value === "") {
      expenseListCopy[key][event.target.name] = 0;
    }
    total = parseInt(expenseListCopy[key]["jtC"]) + parseInt(expenseListCopy[key]["qzC"]) + parseInt(expenseListCopy[key]["szC"]) + parseInt(expenseListCopy[key]["zsC"]) + parseInt(expenseListCopy[key]["qtC"]);
    expenseListCopy[key]["C_Total"] = total;
    this.setState({ expenseList: expenseListCopy });
  }
  handleCountNTD(key, event) {
    let expenseListCopy = [...this.state.expenseList];
    let total = 0;
    if (event.target.value === "") {
      expenseListCopy[key][event.target.name] = 0;
    }
    total = parseInt(expenseListCopy[key]["jtNTD"]) + parseInt(expenseListCopy[key]["qzNTD"]) + parseInt(expenseListCopy[key]["szNTD"]) + parseInt(expenseListCopy[key]["zsNTD"]) + parseInt(expenseListCopy[key]["qtNTD"]);
    expenseListCopy[key]["NTD_Total"] = total;
    this.setState({ expenseList: expenseListCopy });
  }
  handleDelete(key, event) {
    event.preventDefault();
    let expenseListCopy = [...this.state.expenseList];
    expenseListCopy.splice(key, 1);
    this.setState({ expenseList: expenseListCopy });
  }
  // --
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.appForm.formID === undefined) {
      alert("出差核銷失敗。請填寫出差申請單");
    } else if (this.state.expenseList.length === 0) {
      alert("出差核銷失敗。請至少填寫一笔出差費用");
    } else {
      alert("出差核銷成功");
      this.props.parentCallback(this.state);
    }
  }
  render() {
    const appForm = this.props.appForm;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <h1 className={styles.title}>出差核銷單</h1>
        <div className={styles.flex}>
          <label>表單序號 ：{this.state.formID}</label>
          <label>填單日期 ：{this.state.fillDate}</label>
        </div>
        <div className={styles.form_input}>
          <div className={styles.input_box}>
            <DetailBox title="出差申請編號" content={appForm.formID} />
            <DetailBox title="申請人" content={appForm.applicant} />
            <InputBox title="起始日期" type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
            <InputBox title="結束日期" type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
            <InputBox title="志業體名稱" type="text" name="vocationName" value={this.state.vocationName} onChange={this.handleChange} />
            <InputBox title="工作地點" type="text" name="workPlace" value={this.state.workPlace} onChange={this.handleChange} />
          </div>
          <div className={styles.input_box}>
            <DetailBox title="部門名稱" content={appForm.departmentName} />
            <DetailBox title="職稱" content={appForm.jobTitle} />
            <InputBox title="起始時間" type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
            <InputBox title="結束時間" type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
            <InputBox title="出差時數" type="number" min="0" name="tripHour" value={this.state.tripHour} onChange={this.handleChange} />
            <DetailBox title="國内 | 國外" content={appForm.area} />
          </div>
        </div>
        <div className={styles.form_input}>
          <div className={styles.input_box}>
            <DetailBox title="計劃名稱" content={appForm.projectTitle} />
            <DetailBox title="預算科目" content={appForm.budgetAccount} />
            <DetailBox title="預估金額" content={appForm.estAmount} />
          </div>
          <div className={styles.input_box}>
            <DetailBox title="交通工具" content={appForm.transport} />
            <InputBox title="出差性質" type="text" name="businessTrip" value={this.state.businessTrip} onChange={this.handleChange} />
            <InputBox title="動支金額" type="number" min="0" name="totalExpenses" value={this.state.totalExpenses} onChange={this.handleChange} />
          </div>
        </div>
        <div className={styles.form_input}>
          <DetailBox title="出差事由" content={appForm.pDesc} />
          <TextareaBox title="出差心得報告" name="businessReport" value={this.state.businessReport} onChange={this.handleChange} />
        </div>
        {/* Expense Section Start */}
        <h3 className={styles.sub_title}>出差費用</h3>
        <button className={styles.button_add} onClick={this.handleAdd}>
          +
        </button>
        {this.state.expenseList.map((exp, key) => {
          return (
            <div className={styles.form_input} key={key}>
              <InputBox title="説明" type="text" name="expensedesc" value={exp.expensedesc} onChange={(event) => this.handleChangeExpense(key, event)} />
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>幣別</th>
                    <th>交通費</th>
                    <th>簽證費</th>
                    <th>膳雜費</th>
                    <th>住宿費</th>
                    <th>其他</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <InputBox type="text" name="expenseCurrency" value={exp.expenseCurrency} onChange={(event) => this.handleChangeExpense(key, event)} />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="jtC"
                        value={exp.jtC}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountC(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="qzC"
                        value={exp.qzC}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountC(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="szC"
                        value={exp.szC}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountC(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="zsC"
                        value={exp.zsC}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountC(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="qtC"
                        value={exp.qtC}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountC(key, event)}
                      />
                    </td>
                    <td>{exp.C_Total}</td>
                  </tr>
                  <tr>
                    <td>新臺幣</td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="jtNTD"
                        value={exp.jtNTD}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountNTD(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="qzNTD"
                        value={exp.qzNTD}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountNTD(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="szNTD"
                        value={exp.szNTD}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountNTD(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="zsNTD"
                        value={exp.zsNTD}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountNTD(key, event)}
                      />
                    </td>
                    <td>
                      <InputBox
                        type="number"
                        min="0"
                        name="qtNTD"
                        value={exp.qtNTD}
                        onClick={(event) => this.handleClickBlank(key, event)}
                        onChange={(event) => this.handleChangeExpense(key, event)}
                        onBlur={(event) => this.handleCountNTD(key, event)}
                      />
                    </td>
                    <td>{exp.NTD_Total}</td>
                  </tr>
                </tbody>
              </table>
              <button className={styles.button_delete} onClick={(event) => this.handleDelete(key, event)}>
                刪除
              </button>
            </div>
          );
        })}
        {/* Expense Section End */}
        <div className={styles.button}>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    );
  }
}
