import { useRef } from "react";
import classnames from "classnames";
import Checkbox from "shared/ui/checkbox";
import { FilterItemsIds } from "../consts";
import styles from "../styles.module.css";

interface Props {
  selectedCategories: string[];
  onChange: (name: string, value: string[]) => void;
}

export const CategoriesBlock = ({ selectedCategories, onChange }: Props) => {
  const categoriesBlockRef = useRef<HTMLDivElement>(null);
  const checkboxName = 'taskCategory';
  const handleCheckboxChange = () => {
    const form = categoriesBlockRef.current?.closest('form');
    const checkboxList = form && form.elements.namedItem(checkboxName);
    const newListe: string[] = [];
    if (checkboxList instanceof RadioNodeList) {
      const list = Array.prototype.slice.call(checkboxList) as HTMLInputElement[];
      list.forEach((item) => {
        if (item.checked) {
          newListe.push(item.value);
        };
      })
    }
    onChange("categories", newListe);
  };

  return (
    <div className={styles.filterBlock} ref={categoriesBlockRef}>
      <div
        className={classnames(
          styles.filterBlockTitle,
          "text",
          "text_size_small",
          "text_type_bold"
        )}
      >
        Категория
      </div>
      <div className={styles.checkboxesWrapper}>
        <div className={styles.row}>
          <Checkbox
            name='taskCategory'
            label="Категория 1"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_1)}
            id={FilterItemsIds.CATEGORY_1}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            name='taskCategory'
            label="Категория 2"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_2)}
            id={FilterItemsIds.CATEGORY_2}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles.row}>
          <Checkbox
            name='taskCategory'
            label="Категория 3"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_3)}
            id={FilterItemsIds.CATEGORY_3}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            name='taskCategory'
            label="Категория 4"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_4)}
            id={FilterItemsIds.CATEGORY_4}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles.row}>
          <Checkbox
            name='taskCategory'
            label="Категория 5"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_5)}
            id={FilterItemsIds.CATEGORY_5}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            name='taskCategory'
            label="Категория 6"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_6)}
            id={FilterItemsIds.CATEGORY_6}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};
