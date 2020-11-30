type EditData = {
  id: string;
  type: string;
};

type OverlayData = EditData | null;

type OverlayType = 'edit' | 'settings' | null;

type Overlay = {
  isActive: boolean;
  type: OverlayType;
  data: OverlayData;
};

export type { Overlay, OverlayData, OverlayType, EditData };
