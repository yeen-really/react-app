import React, { useCallback, useEffect, useState } from "react";
import FormInput from "./Input";
import axios from "axios";

function SignUp() {
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

  async function handleSubmit() {
    const response = await fetch("http://localhost:1337/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    const data = await response.json();
  }

  async function validateInputs(e) {
    e.preventDefault();
    const isValidPassword = /^[a-z]+$/;
    if (password.match(isValidPassword)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }

    if (passwordRepeat === password) {
      setPasswordRepeatError(false);
    } else {
      setPasswordRepeatError(true);
    }
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(isValidEmail)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    const isValidUsername = /^[A-Za-z0-9]+$/;
    if (username.match(isValidUsername)) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }

    if (
      isPasswordError === false &&
      isUsernameError === false &&
      isPasswordRepeatError === false &&
      isEmailError === false &&
      password !== "" &&
      username !== "" &&
      passwordRepeat !== "" &&
      email !== ""
    ) {
      handleSubmit();

      alert("Регистрация прошла успешно");
    } else {
      alert(
        "Имя пользователя/email уже использовано либо допущены ошибки при заполнении"
      );
    }
  }

  const passwordHandler = useCallback((value) => setPassword(value), []);
  const emailHandler = useCallback((value) => setEmail(value), []);
  const usernameHandler = useCallback((value) => setUsername(value), []);
  const passwordRepeatHandler = useCallback(
    (value) => setPasswordRepeat(value),
    []
  );

  return (
    <>
      <form
        className="flex md:w-1/2 m-auto flex-col p-5 my-10 bg-white border border-gray-200 shadow-2xl rounded-lg "
        onSubmit={validateInputs}
      >
        <h1 className="text-center font-bold text-3xl mb-5">Регистрация</h1>
        <FormInput
          name="Email"
          placeholder="Email"
          value={email}
          type="text"
          setValue={emailHandler}
          isError={isEmailError}
          Error="Некорректный Email"
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
        <FormInput
          name="password"
          placeholder="Пароль повторно"
          value={passwordRepeat}
          type="password"
          setValue={passwordRepeatHandler}
          isError={isPasswordRepeatError}
          Error="Пароли должны совпадать"
        />
        <FormInput
          name="username"
          placeholder="Имя пользователя"
          value={username}
          type="text"
          setValue={usernameHandler}
          isError={isUsernameError}
          Error="Только английские буквы и цифры"
        />

        <button
          type="sumbit"
          className=" rounded py-2 bg-blue-600 hover:bg-blue-700 text-gray-100 active:bg-gray-300"
        >
          Отправить
        </button>
      </form>
    </>
  );
}

export default SignUp;
