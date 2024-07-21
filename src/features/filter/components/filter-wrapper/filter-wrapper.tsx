import { useState, useRef, ReactElement, useCallback, useEffect } from 'react';

import { FilterButton } from 'features/filter/components/filter-button';
import { FilterCover } from 'features/filter/components/filter-cover';
import { IFilterValues } from 'features/filter/types';

interface FilterWrapperProps {
  filterMenu: ReactElement;
  filterValues: IFilterValues;
  setFilteres?: (data: IFilterValues) => void;
  onReset: () => void;
}

export const FilterWrapper = ({
  filterMenu,
  filterValues,
  setFilteres,
  onReset,
}: FilterWrapperProps) => {
  const [isFilterMenuVisible, setFilterMenuVisible] = useState(false);

  const [filterPosition, setFilterPosition] = useState({ top: 10, right: 0 });
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const calculateFilterPosition = useCallback(() => {
    const buttonRect = filterButtonRef.current?.getBoundingClientRect();

    if (buttonRect) {
      setFilterPosition({
        top: buttonRect.bottom + window.scrollY + 15,
        right: buttonRect.right + 5,
      });
    }
  }, []);

  const toggleFilterMenu = () => {
    if (!isFilterMenuVisible) {
      calculateFilterPosition();
    }

    setFilterMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener('resize', calculateFilterPosition);

    return () => {
      window.removeEventListener('resize', calculateFilterPosition);
    };
  }, []);

  return (
    <>
      <FilterButton onClick={toggleFilterMenu} ref={filterButtonRef} />

      {isFilterMenuVisible && (
        <FilterCover
          closeFilterMenu={toggleFilterMenu}
          position={filterPosition}
          filterMenu={filterMenu}
          filterValues={filterValues}
          setFilteres={setFilteres}
          onReset={onReset}
        />
      )}
    </>
  );
};
