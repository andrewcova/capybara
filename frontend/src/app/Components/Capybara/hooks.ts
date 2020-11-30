import { useState, useEffect, RefObject } from 'react';
import { Dimensions } from './CapybaraTile/types';

export const useContainerDimensions = (ref: RefObject<HTMLDivElement>): Dimensions => {
  const getDimensions = () => {
    if (ref.current) {
      return {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };
    }
    throw new Error('ref.current in capybara container is currently null');
  };

  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return dimensions;
};
