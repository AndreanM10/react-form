import React from "react";
import styles from "./App.module.css";
import { Link } from "react-router-dom";

const AppFormList = (props) => {
  const storage = JSON.parse(localStorage.getItem("storage"));
  const user = JSON.parse(sessionStorage.getItem("user"));
  const filteredList = storage[0]
    .filter((form) => form.userID === user.userID && form.isVerified === false)
    .map((filteredForm, key) => (
      <div key={key}>
        {filteredForm.formID} <br />
        {filteredForm.startTime.replace(/T/i, " ")} 至 {filteredForm.endTime.replace(/T/i, " ")}
        <Link
          className={styles.link}
          to="/VerificationForm"
          onClick={() => {
            props.handleForm(filteredForm);
          }}
        >
          點選
        </Link>
      </div>
    ));

  return <div className={styles.list}>{filteredList}</div>;
};

export default AppFormList;
