import React from "react";
import styles from "../App.module.css";

export default function DropdownBox(props) {
  const list = props.list;
  const title = props.title;
  const name = props.name;
  const value = props.value;
  const onChange = props.onChange;
  return (
    <div className={styles.input_box_full}>
      <label className={styles.input_title}>{title}</label>
      <select className={styles.dropdown} name={name} value={value} onChange={onChange} required>
        <option value="" disabled hidden>
          {title}
        </option>
        {list}
      </select>
    </div>
  );
}
