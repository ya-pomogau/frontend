import {
  useState,
  useEffect,
  useRef,
  ReactElement,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import { FilterButton } from 'features/filter/components/filter-button';
import { FilterCover } from 'features/filter/components/filter-cover';
import { IFilterValues } from 'features/filter/types';

interface FilterWrapperProps {
  filterMenu: ReactElement;
  filterValues: IFilterValues;
  setFilterValues: Dispatch<SetStateAction<IFilterValues>>;
}

export const FilterWrapper = ({
  filterMenu,
  filterValues,
  setFilterValues,
}: FilterWrapperProps) => {
  const [isFilterMenuVisible, setFilterMenuVisible] = useState(false);

  const [filterPosition, setFilterPosition] = useState({ top: 0, right: 0 });
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const calculateFilterPosition = useCallback(() => {
    const buttonRect = filterButtonRef.current?.getBoundingClientRect();

    if (buttonRect) {
      setFilterPosition({ top: buttonRect.bottom, right: buttonRect.right });
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
          setFilterValues={setFilterValues}
        />
      )}
    </>
  );
};
