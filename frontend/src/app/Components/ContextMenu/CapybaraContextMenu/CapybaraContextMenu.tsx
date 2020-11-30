import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { CSSTransition } from 'react-transition-group';

import './CapybaraContextMenu.scss';
import { CapybaraContextMenuProps } from './types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { setOverlay } from '../../../store/states/ui/slices/overlay/overlay';
import { setLayout } from '../../../store/states/appState/slices/layout/layout';
import { createNewLinkTile } from '../../Capybara/helpers';

const CapybaraContextMenu: React.FC<CapybaraContextMenuProps> = ({ dispatch, layout }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <CSSTransition
      in={true}
      timeout={1000}
      classNames={
        {
          // enterActive: 'overlay--active',
          // enterDone: 'overlay--active',
          // exit: 'overlay--disappearing',
        }
      }
      unmountOnExit
    >
      <ContextMenu id="capybara-context" onShow={() => setIsActive(true)}>
        <MenuItem
          data={{ foo: 'bar' }}
          onClick={() => {
            dispatch(setOverlay({ isActive: true, type: 'settings', data: null }));
          }}
        >
          Authorise
        </MenuItem>
        <MenuItem
          data={{ foo: 'bar' }}
          onClick={() => {
            const newItem = createNewLinkTile(layout);
            const newLayout = cloneDeep(layout);
            newLayout.push(newItem);
            dispatch(setLayout(newLayout));
          }}
        >
          Add new bookmark
        </MenuItem>
        <MenuItem
          data={{ foo: 'bar' }}
          onClick={() => {
            console.log(111);
          }}
        >
          Add new folder
        </MenuItem>
      </ContextMenu>
    </CSSTransition>
  );
};

export default CapybaraContextMenu;
