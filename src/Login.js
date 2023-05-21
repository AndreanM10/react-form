import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownBox from "./Components/Dropdown";
import users from "./user.json";

const Login = (props) => {
  let navigate = useNavigate();
  const [userData] = useState(users);
  const [user, setUser] = useState({
    userID: "",
  });
  const userList = userData.map(({ userID, name }) => (
    <option key={userID} value={userID}>
      {name}
    </option>
  ));

  const handleSelect = (event) => {
    setUser(userData[event.target.value - 1]);
  };
  return (
    <>
      <DropdownBox list={userList} title="帳戶" value={user.userID} onChange={handleSelect} />
      <button
        onClick={(e) => {
          if (user.userID === "") {
            e.preventDefault();
            alert("請選擇賬戶");
          } else {
            props.parentCallback(user);
            props.setIsLogin(true);
            navigate("/Home");
          }
        }}
      >
        登入
      </button>
    </>
  );
};

export default Login;
