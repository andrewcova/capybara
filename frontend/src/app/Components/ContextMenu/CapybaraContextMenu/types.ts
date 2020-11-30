import { Dispatch } from 'redux';

import { LayoutItem } from '../../../store/states/appState/slices/layout/types';

export type CapybaraContextMenuProps = {
  dispatch: Dispatch<any>;
  layout: LayoutItem[];
};
