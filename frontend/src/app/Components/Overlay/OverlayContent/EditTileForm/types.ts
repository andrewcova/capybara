import { LayoutItemDataContent, LayoutItemDataStyles } from '../../../../store/states/appState/slices/layout/types';

type EditContentInputName = 'url' | 'title';
type EditStyleInputName = 'backgroundColor' | 'color';

type OnContentInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => void;

type EditTileFormProps = {
  inputsData: EditTileInputsData;
  onInputChange: OnContentInputChange;
};

type EditTileInputsData = {
  id: string;
  content: LayoutItemDataContent;
  styles: LayoutItemDataStyles;
};

export type { EditTileInputsData, EditContentInputName, EditStyleInputName, OnContentInputChange, EditTileFormProps };
