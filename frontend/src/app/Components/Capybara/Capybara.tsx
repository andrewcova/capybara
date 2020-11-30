import React, { useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import GridLayout, { ReactGridLayoutProps, ItemCallback } from 'react-grid-layout';
import { ContextMenuTrigger } from 'react-contextmenu';

import CapybaraTile from './CapybaraTile/CapybaraTile';
import CapybaraContextMenu from '../ContextMenu/CapybaraContextMenu/CapybaraContextMenu';
import { mouseMoveListener, preventDefault } from './helpers';
import { useContainerDimensions } from './hooks';
import { setLayout } from '../../../app/store/states/appState/slices/layout/layout';
import { LayoutItem } from '../../store/states/appState/slices/layout/types';
import { State } from '../../store/states/types';

import './Capybara.scss';
import { setTimeout } from 'timers';
import { setOverlay } from '../../store/states/ui/slices/overlay/overlay';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const Capybara: React.FC<{ isOverlayed: boolean }> = ({ isOverlayed }) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  // a safe deep copy of the current layout state
  const layout: LayoutItem[] = cloneDeep(useSelector((state: State) => state.appState.layout));

  const dispatchUpdatedLayoutStateOnDragStop = (RGLLayoutData: GridLayout.Layout[]) => {
    const newLayout = layout.map((item, index) => {
      const newItem = cloneDeep(item);
      newItem.data.grid = RGLLayoutData[index];
      return newItem;
    });
    dispatch(setLayout(newLayout));
  };

  const onDragStart: ItemCallback = (layout, oldItem, newItem, placeholder, evt, element) => {
    evt.target?.addEventListener('mousemove', mouseMoveListener);
    element.style.zIndex = '100';
  };

  const onDragStop: ItemCallback = (RGLLayoutData, oldItem, newItem, placeholder, evt, element) => {
    element.style.zIndex = '0';
    setTimeout(() => {
      evt.target?.removeEventListener('click', preventDefault);
    }, 0);

    dispatchUpdatedLayoutStateOnDragStop(RGLLayoutData);
  };

  const onResizeStart: ItemCallback = (RGLLayoutData, oldItem, newItem, placeholder, evt, element) => {
    element.parentElement!.style.zIndex = '1000';
  };

  const onResizeStop: ItemCallback = (RGLLayoutData, oldItem, newItem, placeholder, evt, element) => {
    dispatchUpdatedLayoutStateOnDragStop(RGLLayoutData);
    element.parentElement!.style.zIndex = '0';
  };

  const { width, height } = useContainerDimensions(containerRef);
  const margin = width / 100;
  const rowHeight = (width - margin * 21) / 20;

  const gridConfig: Readonly<ReactGridLayoutProps> = {
    // innerRef: someRef, // this is supposed to replace the deprecated ReasctDOM.findDOMNode(), but isn't working
    className: 'capybara',
    containerPadding: [20, 20],
    cols: 20,
    width,
    rowHeight,
    margin: [margin, margin],
    verticalCompact: true,
    isDraggable: true,
    isResizable: true,
    isBounded: false,
    useCSSTransforms: true,
    preventCollision: false,
    onResizeStart,
    onResizeStop,
    onDragStart,
    onDragStop,
  };

  const children = useMemo(() => {
    return layout.map(({ type, data }) => (
      <div
        className="capybara__tile-container"
        key={data.grid.i}
        data-grid={data.grid}
        onContextMenu={(evt) => {
          evt.stopPropagation();
          dispatch(setOverlay({ isActive: true, type: 'edit', data: { id: data.grid.i, type } }));
        }}
      >
        <CapybaraTile
          type={type}
          content={data.content}
          styles={data.styles}
          dimensions={{ rowHeight, width: data.grid.w, height: data.grid.h }}
        />
      </div>
    ));
  }, [layout]);

  return (
    <>
      <ContextMenuTrigger id="capybara-context" holdToDisplay={-1}>
        <div
          className="capybara"
          ref={containerRef}
          style={isOverlayed ? { filter: 'blur(1.1px) brightness(70%)', transition: 'all 0.3s ease' } : undefined}
        >
          <GridLayout {...gridConfig}>{children}</GridLayout>
        </div>
      </ContextMenuTrigger>
      <CapybaraContextMenu dispatch={dispatch} layout={layout} />
    </>
  );
};

export default Capybara;
