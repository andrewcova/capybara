import { OverlayType, OverlayData } from '../../store/states/ui/slices/overlay/types';

export type OverlayProps = { type: OverlayType; data: OverlayData; isActive: boolean };
