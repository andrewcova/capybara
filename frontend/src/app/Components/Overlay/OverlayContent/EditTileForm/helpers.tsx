import React from 'react';
import EditLinkForm from './EditLinkForm/EditLinkForm';
import { cloneDeep } from 'lodash';
import { EditTileInputsData, EditStyleInputName, EditContentInputName, OnContentInputChange } from './types';

const getTileFormLayout = (
  type: string,
  inputsData: EditTileInputsData,
  onContentInputChange: OnContentInputChange,
): JSX.Element => {
  switch (type) {
    case 'link':
      return <EditLinkForm inputsData={inputsData} onInputChange={onContentInputChange} />;
    default:
      throw new Error('Invalid overlay form type recieved in EditTileForm component');
  }
};

export { getTileFormLayout };
