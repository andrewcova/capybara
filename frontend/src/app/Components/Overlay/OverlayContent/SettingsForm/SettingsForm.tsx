import React, { useState } from 'react';
import Login from '../../../Login';
import { useSelector } from 'react-redux';
import Registration from '../../../Registration/index';
import { State } from '../../../../store/states/types';
import './SettingsForm.scss';

const SettingsForm: React.FC = () => {
  const user = useSelector((state: State) => state.domainData.authorisation.username);

  console.log(user, 'userFromStore');
  const [showNavigation, setNavigation] = useState(true);
  const [login, setLogin] = useState(false);
  const [registration, setRegistration] = useState(false);

  const goFetch = () => (window.location.href = 'http://localhost:3001/auth/google');
  const logOut = () => (window.location.href = 'http://localhost:3001/auth/logout');

  function showComponent(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();

    setNavigation(false);
    switch ((e.target as HTMLElement).innerText) {
      case 'Register':
        return setRegistration(true);
      case 'Login via E-mail':
        return setLogin(true);
      case 'Login via Google':
        return goFetch();
      case 'Logout':
        return logOut();
    }
  }

  return (
    <>
      {showNavigation ? (
        <div className="overlay-form overlay-form--vertical " onClick={showComponent}>
          {!user ? (
            <>
              <h1>Login via E-mail</h1>
              <h1>Login via Google</h1>
              <h1>Register</h1>
            </>
          ) : (
            <>
              <h1>{user || ''}</h1>
              <h1>Logout</h1>
            </>
          )}
        </div>
      ) : (
        ''
      )}

      {login ? <Login setLogin={setLogin} /> : ''}
      {registration ? <Registration /> : ''}
    </>
  );
};

export default SettingsForm;
