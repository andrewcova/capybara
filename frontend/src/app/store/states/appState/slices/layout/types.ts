import { Layout as RGDLayoutItem } from 'react-grid-layout';

export type LayoutItemDataContent = {
  title: string;
  url: string;
};

export type LayoutItemDataStyles = {
  backgroundColor: string;
  color: string;
};

export type LayoutItemData = {
  grid: RGDLayoutItem;
  content: LayoutItemDataContent;
  styles: LayoutItemDataStyles;
};

export type LayoutItem = {
  type: string;
  data: LayoutItemData;
};
