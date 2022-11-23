import { useState } from "react";
import styles from "./Auth.module.css";
import logo from "../../assets/images/logo.svg";

const login = [styles.login_img, styles.icon].join(" ");
const pass = [styles.pass_img, styles.icon].join(" ");
const passConf = [styles.pass_conf_img, styles.icon].join(" ");
const mail = [styles.mail_img, styles.icon].join(" ");
const msg = [styles.msg_img, styles.icon].join(" ");

export const Auth = () => {
  const [isReg, setIsReg] = useState(false);
  const [isInvisible, setIsInvisible] = useState(true);

  const handleCode = (e: React.FormEvent) => {
    e.preventDefault();

    //future code sender and remember

    setIsInvisible(false);
  };

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <section className={styles.background}>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} />
        <form onSubmit={handleSub}>
          <div className={styles.inputs_container}>
            {isReg ? (
              <div className={styles.inputs_reg}>
                <div className={styles.inputbox}>
                  <div className={login}></div>
                  <input placeholder="login" type="text" />
                </div>
                <div className={styles.inputbox}>
                  <div className={pass}></div>
                  <input placeholder="password" type="password" />
                </div>
                <div className={styles.inputbox}>
                  <div className={passConf}></div>
                  <input placeholder="confirm password" type="password" />
                </div>
                <div className={styles.inputbox}>
                  <div className={mail}></div>
                  <input placeholder="example@mail.ru" type="email" />
                  <button className={styles.code} onClick={handleCode} type="submit">
                    Code
                  </button>
                </div>
                <div
                  className={[
                    styles.inputbox,
                    isInvisible ? styles.invisible : " ",
                  ].join(" ")}
                >
                  <div className={msg}></div>
                  <input placeholder="code from mail" type="text" />
                </div>
              </div>
            ) : (
              <div className={styles.inputs_auth}>
                <div className={styles.inputbox}>
                  <div className={login}></div>
                  <input placeholder="login" type="text" />
                </div>
                <div className={styles.inputbox}>
                  <div className={pass}></div>
                  <input placeholder="password" type="password" />
                </div>
              </div>
            )}
          </div>
          {!isReg && (
            <div className={styles.span}>
              <span>Forgot password?</span>
            </div>
          )}

          <button className={styles.btn} type="submit">{isReg ? "SIGN UP" : "LOG IN"}</button>
        </form>

        {isReg ? (
          <div className={styles.yet}>
            <span onClick={() => setIsReg((prev) => !prev)} className={styles.underline}>Log in</span>
            <span className={styles.pd5}>if you have an account yet.</span>
          </div>
        ) : (
          <div className={styles.yet}>
            <span onClick={() => setIsReg((prev) => !prev)} className={styles.underline}>Sign up</span>
            <span className={styles.pd5}>if you don't have an account yet.</span>
          </div>
        )}
      </div>
    </section>
  );
};
