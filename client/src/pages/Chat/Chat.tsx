import styles from "./Chat.module.css";
import { ChatBlock, MessageContainer } from "../../components";
import { lastVisit } from "./utils";
import React, { useCallback, useMemo, useState } from "react";
import { UserService } from "../../services";
import { ChatResponse, UsersResponse } from "../../models/response";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { IUser } from "../../models/IUser";

export const Chat = () => {
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [chat, setChat] = useState<ChatResponse[]>([]);
  const [name, setName] = useState<string>("");
  const [opponent, setOpponent] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const userJwt: IUser = jwtDecode(localStorage.getItem("token")!);
  const navigate = useNavigate();

  const getUsers = useCallback(async () => {
    try {
      const response = await UserService.fetchUsers();
      for (let i = 0; i < response.data.length; i++) {
        const sortedIds = [userJwt.id, response.data[i].id].sort(
          (a, b) => a - b
        );
        const chat = await UserService.fetchChat(sortedIds[0], sortedIds[1]);
        setUsers((prev) =>
          prev.reduce(
            (s, el, i) => (response.data[i].id === el.id ? s++ : s),
            0
          ) === 0
            ? [...prev, { ...response.data[i], chat: chat.data }]
            : prev
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [userJwt.id]);

  const checkIsAuth = useCallback(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", {});
    }
  }, [navigate]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    const sortedIds = [userJwt.id, opponent].sort((a, b) => a - b);
    try {
      await UserService.sendMessage(
        sortedIds[0],
        sortedIds[1],
        userJwt.id,
        message
      );
      setChat((prev) => [
        ...prev,
        {
          id: prev.at(-1)!.id + 1 ?? 1,
          message: message,
          id_sender: userJwt.id,
          seen: false,
          date: new Date().toString(),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  useMemo(() => {
    checkIsAuth();
    if (!users.length) getUsers();
  }, [checkIsAuth, users.length, getUsers]);

  return (
    <section className={styles.chat}>
      <div className={styles.leftpart}>
        <div className={styles.searchblock}>
          <div className={styles.btn_block}>
            <div className={styles.options} />
          </div>
          <div className={styles.string}>
            <div className={styles.loop_container}>
              <div className={styles.loop} />
            </div>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className={styles.chats}>
          {users.map((item) => (
            <button
              className={styles.block}
              key={item.id}
              onClick={() => {
                setChat(item.chat);
                setName(item.username ?? "");
                setOpponent(item.id);
              }}
            >
              <ChatBlock user={item} />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.rightpart}>
        <div className={styles.background}>
          <div className={styles.infobar}>
            <div className={styles.leftside}>
              <div className={[styles.btn_block, styles.invisible].join(" ")}>
                <div className={styles.back} />
              </div>
              <div className={[styles.avatar, styles.invisible].join(" ")} />
              <div className={styles.nameblock}>
                {chat.length && <span className={styles.name}>{name}</span>}
                <span className={styles.last}>{lastVisit(new Date())}</span>
              </div>
            </div>
            <div className={styles.rightside}>
              <div className={styles.btn_block}>
                <div className={styles.loop} />
              </div>
              <div className={styles.btn_block}>
                <div className={styles.settings} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chatblock}>
          <div className={styles.overflow_y}>
            <MessageContainer chat={chat} />
          </div>
        </div>
        <form onSubmit={sendMessage}>
          <div className={styles.message_block}>
            <div className={styles.messagebar}>
              <input
                type="text"
                className={styles.message}
                placeholder="Message"
                onChange={onInputChange}
                required
              />
              <div className={styles.mic} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
