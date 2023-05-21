import React from "react";
import styles from "../App.module.css";

export default function InputBox(props) {
  const title = props.title;
  return (
    <div className={styles.input_box_full}>
      <label className={styles.input_title}>{title}</label>
      <input {...props} placeholder={title} required />
    </div>
  );
}
