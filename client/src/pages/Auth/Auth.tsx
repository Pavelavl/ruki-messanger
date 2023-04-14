import React, { useState } from "react";
import styles from "./Auth.module.css";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import store from "../../redux/store";
import { userActions } from "../../redux/actions";
import { openNotification } from "../../utils/helpers";
import get from "lodash/get";

export const Auth = () => {
  const login = [styles.login_img, styles.icon].join(" ");
  const pass = [styles.pass_img, styles.icon].join(" ");
  const passConf = [styles.pass_conf_img, styles.icon].join(" ");
  const email = [styles.mail_img, styles.icon].join(" ");
  const msg = [styles.msg_img, styles.icon].join(" ");
  const navigate = useNavigate();
  const [isReg, setIsReg] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
    mail: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    mail: "",
    confirmPassword: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "mail":
          if (!value) {
            stateObj[name] = "Please enter Mail.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isReg) {
      store
        .dispatch(
          userActions.fetchUserLogin({
            mail: input.mail,
            password: input.password,
          })
        )
        .then(() => {
          navigate("/chat", {});
        });
    } else {
      store
        .dispatch(
          userActions.fetchUserRegister({
            username: input.username,
            mail: input.mail,
            password: input.password,
          })
        )
        .then(() => {
          navigate("/chat", {});
        })
        .catch((err) => {
          if (
            get(err, "response.data.message.errmsg", "").indexOf("dup") >= 0
          ) {
            openNotification({
              title: "Ошибка",
              text: "Аккаунт с такой почтой уже создан.",
              type: "error",
              duration: 5000,
            });
          } else {
            openNotification({
              title: "Ошибка",
              text: "Возникла серверная ошибка при регистрации. Повторите позже.",
              type: "error",
              duration: 5000,
            });
          }
        });
    }
  };

  return (
    <section className={styles.background}>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} alt="logo" />
        <form onSubmit={handleSub}>
          <div className={styles.inputs_container}>
            {isReg ? (
              <div className={styles.inputs_reg}>
                <div className={styles.inputbox}>
                  <div className={login} />
                  <div className={styles.error}>
                    <input
                      required
                      name="username"
                      onChange={onInputChange}
                      onBlur={validateInput}
                      placeholder="login"
                      type="text"
                    />
                    {error.username && (
                      <span className={styles.err}>{error.username}</span>
                    )}
                  </div>
                </div>
                <div className={styles.inputbox}>
                  <div className={pass} />
                  <div className={styles.error}>
                    <input
                      required
                      name="password"
                      onChange={onInputChange}
                      onBlur={validateInput}
                      placeholder="password"
                      type="password"
                    />
                    {error.password && (
                      <span className={styles.err}>{error.password}</span>
                    )}
                  </div>
                </div>
                <div className={styles.inputbox}>
                  <div className={passConf} />
                  <div className={styles.error}>
                    <input
                      required
                      onChange={onInputChange}
                      onBlur={validateInput}
                      name="confirmPassword"
                      placeholder="confirm password"
                      type="password"
                    />
                    {error.confirmPassword && (
                      <span className={styles.err}>
                        {error.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.inputbox}>
                  <div className={email} />
                  <div className={styles.error}>
                    <input
                      required
                      name="mail"
                      onChange={onInputChange}
                      onBlur={validateInput}
                      placeholder="example@mail.ru"
                      type="email"
                    />
                    {error.mail && (
                      <span className={styles.err}>{error.mail}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.inputs_auth}>
                <div className={styles.inputbox}>
                  <div className={email} />
                  <input
                    required
                    name="mail"
                    onChange={onInputChange}
                    onBlur={validateInput}
                    placeholder="example@mail.ru"
                    type="email"
                  />
                </div>
                <div className={styles.inputbox}>
                  <div className={pass} />
                  <input
                    required
                    name="password"
                    onChange={onInputChange}
                    onBlur={validateInput}
                    placeholder="password"
                    type="password"
                  />
                </div>
              </div>
            )}
          </div>
          {!isReg && (
            <div className={styles.span}>
              <span>Forgot password?</span>
            </div>
          )}

          <button className={styles.btn} type="submit">
            {isReg ? "SIGN UP" : "LOG IN"}
          </button>
        </form>

        {isReg ? (
          <div className={styles.yet}>
            <span
              onClick={() => {
                setIsReg((prev) => !prev);
              }}
              className={styles.underline}
            >
              Log in
            </span>
            <span className={styles.pd5}>if you have an account yet.</span>
          </div>
        ) : (
          <div className={styles.yet}>
            <span
              onClick={() => {
                setIsReg((prev) => !prev);
              }}
              className={styles.underline}
            >
              Sign up
            </span>
            <span className={styles.pd5}>
              if you don't have an account yet.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
