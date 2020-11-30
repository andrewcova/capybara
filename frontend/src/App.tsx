import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from './app/store/states/types';
import { authorise } from './app/store/states/domainData/slices/auth/auth';
import Capybara from './app/Components/Capybara/Capybara';
import Overlay from './app/Components/Overlay/Overlay';
import { Overlay as OverlayState } from './app/store/states/ui/slices/overlay/types';
import { setLayout } from './app/store/states/appState/slices/layout/layout';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // (async () => {
    fetch('http://localhost:3001/api/current_user')
      .then((res) => res.json())
      .then((data) => {
        dispatch(authorise(data.name));
        dispatch(setLayout(data.layout));
      })
      .catch(() => {
        console.log("failed to fetch current user. it's okay! he may not exist!");
      });
  }, []);

  const { type, data, isActive }: OverlayState = useSelector((state: State) => state.ui.overlay);

  return (
    <div className="App">
      <Capybara isOverlayed={isActive} />
      <Overlay type={type} data={data} isActive={isActive} />
    </div>
  );
};

export default App;
