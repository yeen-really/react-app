import React, { useCallback, useEffect, useState } from "react";
import FormInput from "./Input";
import axios from "axios";

function Login() {
  const [password, setPassword] = useState("");
  const [isPasswordError, setPasswordError] = useState(false);
  const [PasswordError, setPassError] = useState("");

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isPasswordRepeatError, setPasswordRepeatError] = useState(false);
  const [PasswordRepeatError, setPassRepeatError] = useState("");

  const [username, setUsername] = useState("");
  const [isUsernameError, setUsernameError] = useState(false);
  const [UsernameError, setUserError] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailError, setEmailError] = useState(false);
  const [EmailError, setMailError] = useState("");

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    if (data.user) {
      alert("Вход осуществлен");
    } else {
      alert("Неверно заполнены поля");
    }
    console.log(data);
  }

  const passwordHandler = useCallback((value) => setPassword(value), []);
  const usernameHandler = useCallback((value) => setUsername(value), []);

  return (
    <>
      <form className="flex md:w-1/2 m-auto flex-col p-5 bg-white border border-gray-200 shadow-2xl rounded-lg" onSubmit={loginUser}>
        <h1 className="text-center font-bold text-3xl mb-5">Вход</h1>
        <FormInput
          name="username"
          placeholder="Имя пользователя"
          value={username}
          type="text"
          setValue={usernameHandler}
          isError={isUsernameError}
          Error="Только английские буквы и цифры"
        />
        <FormInput
          name="password"
          placeholder="Пароль"
          value={password}
          type="password"
          setValue={passwordHandler}
          isError={isPasswordError}
          Error="Только английские символы в нижнем регистре"
        />
        <button
          type="sumbit"
          className="rounded py-2 bg-blue-600 hover:bg-blue-700 text-gray-100 active:bg-gray-300"
        >
          Отправить
        </button>
      </form>
    </>
  );
}

export default Login;
