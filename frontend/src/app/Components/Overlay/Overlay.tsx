import React from 'react';
import { OverlayProps } from './types';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { unsetOverlay } from '../../store/states/ui/slices/overlay/overlay';
import OverlayContent from './OverlayContent/OverlayContent';
import './Overlay.scss';

const Overlay: React.FC<OverlayProps> = ({ type, data, isActive }) => {
  const dispatch = useDispatch();

  // TODO: refactor so that it works without unmountOnExit
  return (
    <CSSTransition
      in={isActive}
      timeout={300}
      classNames={{
        // TODO: this is BS, fix it
        enterActive: 'overlay--active',
        enterDone: 'overlay--active',
        exit: 'overlay--disappearing',
      }}
      unmountOnExit
    >
      <div role="button" className="overlay" onClick={() => dispatch(unsetOverlay())}>
        <OverlayContent type={type} data={data} />
      </div>
    </CSSTransition>
  );
};

export default Overlay;
