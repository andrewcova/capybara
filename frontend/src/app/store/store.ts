import { configureStore } from '@reduxjs/toolkit';
import reducer from './states/rootReducer';

const store = configureStore({ reducer });

let lastLayout = store.getState().appState.layout;

// Updates layout in local storage on every layout change in the state
if (window.localStorage) {
  store.subscribe(() => {
    const newLayout = store.getState().appState.layout;
    if (newLayout !== lastLayout) {
      lastLayout = newLayout;
      window.localStorage.setItem('layout', JSON.stringify(newLayout));

      fetch(`http://localhost:3001/api/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ layout: newLayout }),
      }).then((res) => console.log(res.status));
    }
  });
}

export default store;
