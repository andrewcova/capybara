import React from 'react';

import { OverlayContentProps } from './types';
import EditTileForm from './EditTileForm/EditTileForm';
import SettingsForm from './SettingsForm/SettingsForm';

const OverlayContent: React.FC<OverlayContentProps> = ({ type, data }) => {
  if (type === 'edit' && !data) {
    throw new Error('One of the props provided to OverlayContent Component is empty.');
  }
  switch (type) {
    case 'edit':
      return <EditTileForm {...data!} />;
    case 'settings':
      return <SettingsForm />;
    default:
      throw new Error('Invalid overlay type recieved while mapping types to Components');
  }
};

export default OverlayContent;
