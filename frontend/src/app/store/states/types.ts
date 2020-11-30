import { Authorisation } from './domainData/slices/auth/types';
import { LayoutItem } from './appState/slices/layout/types';
import { Styles } from './ui/slices/styles/types';
import { Overlay } from './ui/slices/overlay/types';

type State = {
  domainData: { authorisation: Authorisation };
  appState: { layout: LayoutItem[] };
  ui: {
    styles: Styles;
    overlay: Overlay;
  };
};

export type { State };
