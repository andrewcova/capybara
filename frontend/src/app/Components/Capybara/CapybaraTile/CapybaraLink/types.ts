import { LayoutItemDataStyles } from '../../../../store/states/appState/slices/layout/types';

type CapybaraLinkProps = {
  children: string;
  to: string;
  styles: LayoutItemDataStyles;
  dimensions: { rowHeight: number; width: number; height: number };
};

export type { CapybaraLinkProps };
