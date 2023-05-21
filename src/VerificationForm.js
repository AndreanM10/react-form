import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styles from "./App.module.css";
import InputBox from "./Components/Input";
import TextareaBox from "./Components/Textarea";
import DetailBox from "./Components/Details";

const currency = [
  { label: "-", value: "-" },
  { label: "USD", value: "美元" },
  { label: "EUR", value: "歐元" },
  { label: "GBP", value: "英鎊" },
  { label: "RUB", value: "盧布" },
  { label: "AUD", value: "澳元" },
  { label: "CNY", value: "人民幣" },
  { label: "HKD", value: "港元" },
  { label: "JPY", value: "日元" },
  { label: "KRW", value: "韓元" },
  { label: "IDR", value: "印尼盾" },
  { label: "MYR", value: "令吉" },
  { label: "SGD", value: "新加坡幣" },
  { label: "THB", value: "泰銖" },
];
const currencyList = currency.map((c, key) => (
  <option key={key} name={c.label} value={c.value}>
    {c.label}
  </option>
));

export default function VerificationForm(props) {
  dayjs.extend(duration);
  let navigate = useNavigate();
  const user = props.user;
  const storage = JSON.parse(localStorage.getItem("storage"));
  const [appForm] = useState({ ...props.appForm, isVerified: true });
  const ID = storage[1].filter((form) => form.userID === user.userID).length;
  const [verForm, setVerForm] = useState({
    formID: "V" + user.userID + "00" + ID,
    appFormID: appForm.formID,
    fillDate: "",
    startTime: "",
    endTime: "",
    tripTime: [0, 0, 0],
    workPlace: "",
    vocationName: "",
    businessTrip: "",
    businessReport: "",
    totalExpenses: "",
    expenseCurrency: "",
    expenseList: [
      {
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
    allC: 0,
    allNTD: 0,
  });
  useEffect(() => {
    var dateInterval = setInterval(() => getDate(), 1000);
    return () => {
      clearInterval(dateInterval);
    };
  });
  const getDate = () => {
    var fillDate = new Date().toLocaleDateString();
    setVerForm((prevState) => {
      return {
        ...prevState,
        fillDate,
      };
    });
  };
  const timeDiff = () => {
    const dateStart = dayjs(verForm.startTime);
    const dateEnd = dayjs(verForm.endTime);
    let dateDiff = dayjs.duration(dateEnd.diff(dateStart));
    let dateDiffDays = dateDiff.asDays();
    let dateDiffHours = dateDiff.hours();
    let dateDiffMinutes = dateDiff.minutes();
    if (isNaN(dateDiffHours && dateDiffMinutes)) {
      dateDiffDays = 0;
      dateDiffHours = 0;
      dateDiffMinutes = 0;
    }
    setVerForm((prevState) => {
      return {
        ...prevState,
        tripTime: [parseInt(dateDiffDays), dateDiffHours, dateDiffMinutes],
      };
    });
  };
  const handleChange = (event) => {
    setVerForm((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  // --
  const handleAdd = (event) => {
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
    let expenseListCopy = [...verForm.expenseList];
    expenseListCopy.push(expenseState);
    setVerForm((prevState) => {
      return {
        ...prevState,
        expenseList: expenseListCopy,
      };
    });
  };
  const handleChangeExpense = (key, event) => {
    let expenseListCopy = [...verForm.expenseList];
    expenseListCopy[key][event.target.name] = event.target.value;
    setVerForm((prevState) => {
      return {
        ...prevState,
        expenseList: expenseListCopy,
      };
    });
  };
  const handleClickBlank = (key, event) => {
    let expenseListCopy = [...verForm.expenseList];
    if (event.target.value === "0") {
      expenseListCopy[key][event.target.name] = "";
      setVerForm((prevState) => {
        return {
          ...prevState,
          expenseList: expenseListCopy,
        };
      });
    }
  };
  const handleCountC = (key, event) => {
    let expenseListCopy = [...verForm.expenseList];
    let total = 0;
    if (event.target.value === "") {
      expenseListCopy[key][event.target.name] = 0;
    }
    total = parseInt(expenseListCopy[key]["jtC"]) + parseInt(expenseListCopy[key]["qzC"]) + parseInt(expenseListCopy[key]["szC"]) + parseInt(expenseListCopy[key]["zsC"]) + parseInt(expenseListCopy[key]["qtC"]);
    expenseListCopy[key]["C_Total"] = total;
    countTotalC(expenseListCopy);
  };
  const countTotalC = (props) => {
    let C = 0;
    props.forEach((item) => {
      C = C + item.C_Total;
    });
    setVerForm((prevState) => {
      return {
        ...prevState,
        expenseList: props,
        allC: C,
      };
    });
  };
  const handleCountNTD = (key, event) => {
    let expenseListCopy = [...verForm.expenseList];
    let total = 0;
    if (event.target.value === "") {
      expenseListCopy[key][event.target.name] = 0;
    }
    total = parseInt(expenseListCopy[key]["jtNTD"]) + parseInt(expenseListCopy[key]["qzNTD"]) + parseInt(expenseListCopy[key]["szNTD"]) + parseInt(expenseListCopy[key]["zsNTD"]) + parseInt(expenseListCopy[key]["qtNTD"]);
    expenseListCopy[key]["NTD_Total"] = total;
    countTotalNTD(expenseListCopy);
  };
  const countTotalNTD = (props) => {
    let NTD = 0;
    props.forEach((item) => {
      NTD = NTD + item.NTD_Total;
    });
    setVerForm((prevState) => {
      return {
        ...prevState,
        expenseList: props,
        allNTD: NTD,
      };
    });
  };
  const handleDelete = (key, event) => {
    event.preventDefault();
    let expenseListCopy = [...verForm.expenseList];
    expenseListCopy.splice(key, 1);
    countTotalNTD(expenseListCopy);
    countTotalC(expenseListCopy);
  };
  // --
  const handleSubmit = (event) => {
    event.preventDefault();
    if (verForm.expenseList.length === 0) {
      alert("出差核銷失敗。請至少填寫一笔出差費用");
    } else if ((appForm.tripTime[0] || appForm.tripTime[1] || appForm.tripTime[2]) <= 0) {
      alert("出差核銷失敗。請輸入正確的出差時數");
    } else {
      alert("出差核銷成功");
      navigate("/Home");
      props.parentCallback(verForm, appForm);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>出差核銷單</h1>
      <div className={styles.flex}>
        <label>表單序號 ：{verForm.formID}</label>
        <label>填單日期 ：{verForm.fillDate}</label>
      </div>
      <div className={styles.form_input}>
        <div className={styles.input_box}>
          <DetailBox title="出差申請編號" content={appForm.formID} />
          <DetailBox title="申請人" content={user.name} />
          <InputBox title="起始時間" type="datetime-local" name="startTime" value={verForm.startTime} onChange={handleChange} onBlur={timeDiff} />
          <InputBox title="志業體名稱" type="text" name="vocationName" value={verForm.vocationName} onChange={handleChange} />
          <InputBox title="工作地點" type="text" name="workPlace" value={verForm.workPlace} onChange={handleChange} />
        </div>
        <div className={styles.input_box}>
          <DetailBox title="部門名稱" content={user.departmentName} />
          <DetailBox title="職稱" content={user.jobTitle} />
          <InputBox title="結束時間" type="datetime-local" name="endTime" value={verForm.endTime} onChange={handleChange} onBlur={timeDiff} />
          <DetailBox title="出差時數" content={verForm.tripTime[0] + " 天 " + verForm.tripTime[1] + " 小時 " + verForm.tripTime[2] + " 分鐘"} />
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
          <InputBox title="出差性質" type="text" name="businessTrip" value={verForm.businessTrip} onChange={handleChange} />
          <InputBox title="動支金額" type="number" min="0" name="totalExpenses" value={verForm.totalExpenses} onChange={handleChange} />
        </div>
      </div>
      <div className={styles.form_input}>
        <DetailBox title="出差事由" content={appForm.pDesc} />
        <TextareaBox title="出差心得報告" rows="5" name="businessReport" value={verForm.businessReport} onChange={handleChange} />
      </div>
      {/* Expense Section Start */}
      <h2 className={styles.sub_title}>出差費用</h2>
      <table className={styles.table_s}>
        <thead>
          <tr>
            <th>幣別</th>
            <th>總計</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>新臺幣</td>
            <td>{verForm.allNTD}</td>
          </tr>
          <tr>
            <td>
              <InputBox list="currency" type="text" name="expenseCurrency" value={verForm.expenseCurrency} onChange={handleChange} />
              <datalist id="currency">{currencyList}</datalist>
            </td>
            <td>{verForm.allC}</td>
          </tr>
        </tbody>
      </table>
      <button className={styles.button_add} onClick={handleAdd}>
        +
      </button>
      {verForm.expenseList.map((exp, key) => {
        return (
          <div className={styles.form_input} key={key}>
            <InputBox title="説明" type="text" name="expensedesc" value={exp.expensedesc} onChange={(event) => handleChangeExpense(key, event)} />
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
                  <td>新臺幣</td>
                  <td>
                    <InputBox type="number" min="0" name="jtNTD" value={exp.jtNTD} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountNTD(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="qzNTD" value={exp.qzNTD} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountNTD(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="szNTD" value={exp.szNTD} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountNTD(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="zsNTD" value={exp.zsNTD} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountNTD(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="qtNTD" value={exp.qtNTD} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountNTD(key, event)} />
                  </td>
                  <td>{exp.NTD_Total}</td>
                </tr>
                <tr>
                  <td>{verForm.expenseCurrency}</td>
                  <td>
                    <InputBox type="number" min="0" name="jtC" value={exp.jtC} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountC(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="qzC" value={exp.qzC} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountC(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="szC" value={exp.szC} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountC(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="zsC" value={exp.zsC} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountC(key, event)} />
                  </td>
                  <td>
                    <InputBox type="number" min="0" name="qtC" value={exp.qtC} onClick={(event) => handleClickBlank(key, event)} onChange={(event) => handleChangeExpense(key, event)} onBlur={(event) => handleCountC(key, event)} />
                  </td>
                  <td>{exp.C_Total}</td>
                </tr>
              </tbody>
            </table>
            <button className={styles.button_delete} onClick={(event) => handleDelete(key, event)}>
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
