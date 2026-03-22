'use client';

import classNames from 'classnames';
import Link from 'next/link';
import styles from '@auth/signin/signin.module.css';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { authUser, getToken } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChangeEmail = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }
    setIsLoading(true);

    authUser({ email, password })
      .then((res) => {
        console.log(res);
        return getToken({email, password})
      }).then((tokens) => {
        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
            setErrorMessage('Отсутствует интернет. Попробуйте позже');
          } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
            setErrorMessage('Неизвестная ошибка. Попробуйте позже');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21}/>
        </div>
      </Link>
      
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="email"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />

      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        type="submit"
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>      
    </>
  );
}
