import React from "react";
import styles from "../App.module.css";

export default function DetailBox(props) {
  const title = props.title;
  const content = props.content;
  return (
    <div className={styles.input_box_full}>
      <label className={styles.input_title}>{title}</label>
      <label className={styles.details}>{content}</label>
    </div>
  );
}
