import { LayoutItem } from '../layout/types';

const getLayoutFromLocalStorage = (): LayoutItem[] | null => {
  let layout: LayoutItem[];
  if (window.localStorage) {
    const layoutJSONString = window.localStorage.getItem('layout');
    if (layoutJSONString) {
      try {
        layout = JSON.parse(layoutJSONString);
        return layout;
      } catch (err) {
        throw new Error('Error occured while parsing local storage layout data');
      }
    }
  }
  return null;
};

const findLayoutItemById = (state: LayoutItem[], id: string) => {
  const layoutItem = state.find((item) => item.data.grid.i === id);
  if (!layoutItem) {
    throw new Error("Error occured while setting tile's layout data to Redux state");
  }
  return layoutItem;
};

export { getLayoutFromLocalStorage, findLayoutItemById };
