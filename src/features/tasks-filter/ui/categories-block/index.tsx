import classnames from "classnames";
import { ChangeEvent } from "react";
import Checkbox from "shared/ui/checkbox";
import { FilterItemsIds } from "../consts";
import styles from "../styles.module.css";

interface Props {
  selectedCategories: string[];
  onChange: (name: string, value: string[]) => void;
}

export const CategoriesBlock = ({ selectedCategories, onChange }: Props) => {
  const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let newValue;
    if (target.checked) {
      newValue = [...selectedCategories, target.id];
    } else {
      newValue = selectedCategories.filter((item) => item !== target.id);
    }
    onChange("categories", newValue);
  };

  return (
    <div className={styles.filterBlock}>
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
            label="Категория 1"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_1)}
            id={FilterItemsIds.CATEGORY_1}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            label="Категория 2"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_2)}
            id={FilterItemsIds.CATEGORY_2}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles.row}>
          <Checkbox
            label="Категория 3"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_3)}
            id={FilterItemsIds.CATEGORY_3}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            label="Категория 4"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_4)}
            id={FilterItemsIds.CATEGORY_4}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles.row}>
          <Checkbox
            label="Категория 5"
            checked={selectedCategories.includes(FilterItemsIds.CATEGORY_5)}
            id={FilterItemsIds.CATEGORY_5}
            onChange={handleCheckboxChange}
          />
          <Checkbox
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
