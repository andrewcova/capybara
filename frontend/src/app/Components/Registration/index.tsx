import './style.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unsetOverlay } from '../../store/states/ui/slices/overlay/overlay';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  function userName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function userEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function userPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  async function userSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch('http://localhost:3001/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.status === 200) {
      console.log(res.status, 'From http://localhost:3001/auth/registration');
      dispatch(unsetOverlay());
    }

    clearInputs();
  }

  return (
    <form onSubmit={userSubmit} className="overlay-form overlay-form--reg" onClick={(e) => e.stopPropagation()}>
      <div className="overlay-form__group2">
        <label className="overlay-form__label">Username</label>
        <input
          className="overlay-form__input overlay-form__input--text"
          onChange={userName}
          type="text"
          aria-describedby="emailHelp"
          value={name}
          name="name"
        />
      </div>
      <div className="overlay-form__group2">
        <label className="overlay-form__label">Email address</label>
        <input
          className="overlay-form__input overlay-form__input--text"
          onChange={userEmail}
          type="email"
          aria-describedby="emailHelp"
          value={email}
          name="email"
        />
      </div>
      <div className="overlay-form__group2">
        <label className="overlay-form__label">Password</label>
        <input
          className="overlay-form__input overlay-form__input--text"
          onChange={userPassword}
          value={password}
          type="password"
        />
      </div>
      <button type="submit" className="overlay__submit">
        Submit
      </button>
    </form>
  );
};

export default Registration;
