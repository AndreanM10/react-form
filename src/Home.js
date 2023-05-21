import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  let navigate = useNavigate();
  return (
    <>
      <main>
        <h2>你好，{props.user.name}!</h2>
      </main>
      <button
        onClick={() => {
          props.setIsLogin(false);
          navigate("/");
        }}
      >
        登出
      </button>
    </>
  );
}
