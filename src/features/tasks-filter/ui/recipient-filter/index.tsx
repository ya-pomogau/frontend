import classnames from "classnames";
import { ChangeEvent } from "react";
import Checkbox from "shared/ui/checkbox";
import { CategoriesBlock } from "../categories-block";
import { FilterItemsIds } from "../consts";
import { TRecipientFilter } from "../types";
import styles from "../styles.module.css";

interface Props {
  filter: TRecipientFilter;
  onChange: (name: string, value: string[] | boolean) => void;
}

export const RecipientFilter = ({ filter, onChange }: Props) => {
  const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.id, target.checked);
  };

  return (
    <>
      <div className={styles.filterBlock}>
        <div
          className={classnames(
            styles.filterBlockTitle,
            "text",
            "text_size_small",
            "text_type_bold"
          )}
        >
          Отображать
        </div>
        <Checkbox
          label="По дате"
          checked={filter.showByDate}
          id={FilterItemsIds.SHOW_BY_DATE}
          onChange={handleCheckboxChange}
        />
      </div>

      <CategoriesBlock filter={filter.categories} onChange={onChange} />
    </>
  );
};
