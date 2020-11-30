import './style.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authorise } from '../../store/states/domainData/slices/auth/auth';
import { unsetOverlay } from '../../store/states/ui/slices/overlay/overlay';
import { setLayout } from '../../store/states/appState/slices/layout/layout';
const Login: React.FC<{ setLogin: (param: boolean) => any }> = ({ setLogin }) => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [goFetch, setgoFetch] = useState(false);

  useEffect(() => {
    if (goFetch && email) {
      fetch(`http://localhost:3001/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(authorise(data.name));
          dispatch(unsetOverlay());
          dispatch(setLayout(data.layout));
          window.location.href = 'http://localhost:3001';
          console.log(data.layout);
        })
        .catch((err) => console.log(err, '<<>>'));
      setLogin(false);
    }
    clearInputs();
  }, [goFetch]);

  function userEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function userPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };
  function userSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setgoFetch(true);
  }

  return (
    <form onSubmit={userSubmit} className="overlay-form overlay-form--login" onClick={(e) => e.stopPropagation()}>
      <div className="overlay-form__group">
        <label className="overlay-form__label">Email address</label>
        <input
          onChange={userEmail}
          type="email"
          value={email}
          className="overlay-form__input overlay-form__input--text"
        />
        <small id="emailHelp" className="form-text text-muted"></small>
      </div>
      <div className="overlay-form__group">
        <label className="overlay-form__label">Password</label>
        <input
          onChange={userPassword}
          type="password"
          value={password}
          className="overlay-form__input overlay-form__input--text"
        />
      </div>
      <button className="overlay__submit">Submit</button>
    </form>
  );
};

export default Login;
