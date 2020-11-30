import { LayoutItemDataContent, LayoutItemDataStyles } from '../../../store/states/appState/slices/layout/types';

export type Dimensions = { width: number; height: number };

export type CapybaraTileProps = {
  type: string;
  content: LayoutItemDataContent;
  styles: LayoutItemDataStyles;
  dimensions: { rowHeight: number; width: number; height: number };
};
