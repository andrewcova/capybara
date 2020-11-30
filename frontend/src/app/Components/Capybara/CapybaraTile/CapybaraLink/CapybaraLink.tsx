import React, { useState } from 'react';
import './CapybaraLink.scss';
import { CapybaraLinkProps } from './types';

const CapybaraLink: React.FC<CapybaraLinkProps> = ({
  children,
  to,
  styles,
  dimensions: { width, height, rowHeight },
}) => {
  let hostname = '';
  try {
    hostname = new URL(to).hostname;
  } catch {}

  console.log('TILE RENDERED');

  return (
    <a
      style={{
        ...styles,
        padding: width === 1 || height === 1 ? '0.4em' : '0.8em',
        borderColor: styles.color,
        flexDirection: height === 1 ? 'row' : 'column',
        alignItems: height === 1 || width === 1 ? 'center' : 'flex-start',
      }}
      className="capytile--link"
      href={to}
      onDragStart={(evt) => evt.preventDefault()}
      onContextMenu={(evt) => {
        evt.preventDefault();
      }}
    >
      <img
        className="capytile--link__icon"
        src={
          hostname
            ? `https://api.faviconkit.com/${hostname}/144`
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9NTvjzNrzPuw4Qqa7htI67VJ37jzP36pGew&usqp=CAU'
        }
        alt="favicon"
        style={{
          width: width === 1 && height === 1 ? '100%' : width === 1 ? '90%' : '',
          margin: width === 1 && height === 1 ? '0' : height === 1 ? '0 0.7em 0 0' : '',
          marginLeft: height === 1 && width !== 1 ? '0.6em' : '0',
          marginTop: width === 1 && height !== 1 ? '0.6em' : '0',
        }}
      />
      <div
        className="capytile--link__title"
        style={{
          display: width === 1 && height === 1 ? 'none' : 'block',
          alignSelf: height === 1 || width === 1 ? 'center' : 'flex-end',
          writingMode: width === 1 ? 'vertical-rl' : 'initial',
          transform: width === 1 ? 'rotate(180deg)' : '',
          marginBottom: width === 1 ? '0.7em' : '',
          marginRight: height === 1 ? '0.7em' : '',
          whiteSpace: width === 1 || height === 1 ? 'nowrap' : 'initial',
        }}
      >
        {children}
      </div>
    </a>
  );
};

export default React.memo(CapybaraLink);
