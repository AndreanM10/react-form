import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import Login from "./Login";
import Home from "./Home";
import ApplicationForm from "./ApplicationForm";
import AppFormList from "./AppFormList";
import VerificationForm from "./VerificationForm";

const App = () => {
  const [appForm, setAppForm] = useState({});
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [storage, setStorage] = useState([[], []]);
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleForm = (childState) => {
    setAppForm(childState);
  };

  const handleStorageAppForm = (childState) => {
    let storageCopy = storage;
    storageCopy[0].push(childState);
    setStorage(storageCopy);
    localStorage.setItem("storage", JSON.stringify(storage));
  };
  const handleStorageVerForm = (childState, newAppState) => {
    let storageCopy = storage;
    let filteredStorage = storageCopy[0].filter((form) => form.formID !== childState.appFormID);
    storageCopy[0] = filteredStorage;
    storageCopy[0].push(newAppState);
    storageCopy[1].push(childState);
    setStorage(storageCopy);
    localStorage.setItem("storage", JSON.stringify(storage));
  };

  return (
    <>
      <nav>
        <Link
          className={styles.nav_link}
          to="/Home"
          onClick={(e) => {
            if (isLogin === false) {
              e.preventDefault();
              alert("請登入賬戶");
            }
          }}
        >
          首頁
        </Link>
        <Link
          className={styles.nav_link}
          to="/ApplicationForm"
          onClick={(e) => {
            if (isLogin === false) {
              e.preventDefault();
              alert("請登入賬戶");
            }
            if (localStorage.getItem("storage") === null) {
              localStorage.setItem("storage", JSON.stringify([[], []]));
            }
          }}
        >
          出差申請單
        </Link>
        <Link
          className={styles.nav_link}
          to="/AppFormList"
          onClick={(e) => {
            if (isLogin === false) {
              e.preventDefault();
              alert("請登入賬戶");
            }
            if (localStorage.getItem("storage") === null) {
              localStorage.setItem("storage", JSON.stringify([[], []]));
            }
          }}
        >
          出差核銷單
        </Link>
      </nav>
      <div className={styles.App}>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setIsLogin={setIsLogin}
                parentCallback={(childState) => {
                  setUser(childState);
                }}
              />
            }
          />
          <Route path="Home" element={<Home parentCallback={handleStorageAppForm} state={appForm} setState={setAppForm} user={user} setIsLogin={setIsLogin} />} />
          <Route path="ApplicationForm" element={<ApplicationForm parentCallback={handleStorageAppForm} user={user} />} />
          <Route path="AppFormList" element={<AppFormList user={user} storage={storage} handleForm={handleForm} />} />
          <Route path="VerificationForm" element={<VerificationForm parentCallback={handleStorageVerForm} user={user} appForm={appForm} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
