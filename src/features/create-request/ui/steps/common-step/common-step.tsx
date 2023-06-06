import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import classNames from "classnames";
import { changeStepDecrement, closePopup } from "features/create-request/model";
import { Button } from "shared/ui/button";
import { LocationIcon } from "shared/ui/icons/location-icon";
import { CategoriesBackground } from "shared/ui/categories-background";
import styles from "./common-step.module.css";

export const CommonStep = () => {
  const dispatch = useAppDispatch();
  const { time, address, typeOfTask, descriptionForTask, date } =
    useAppSelector((state: RootState) => state.createRequest);

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

  const handleSubmitClick = () => {
    dispatch(closePopup());
  };

  return (
    <>
      <div
        className={classNames(
          "text",
          "text_type_regular",
          "m-0",
          styles.container
        )}
      >
        <div
          className={classNames(
            "text",
            "text_type_regular",
            "m-0",
            styles.dateWrapper
          )}
        >
          <p className={classNames("text_size_large", "m-0")}>{date}</p>
          <p className={classNames("text_size_large", "m-0", styles.time)}>
            {time}
          </p>
        </div>
        <div className={styles.addressWrapper}>
          <LocationIcon color="blue" />
          <p className={classNames("m-0", "text_size_medium")}>{address}</p>
        </div>
        <CategoriesBackground
          theme="primary"
          size="medium"
          content="Категория"
          extClassName={styles.categories}
        />
        <p
          className={classNames(
            "text_size_medium",
            "text_type_bold ",
            "m-0",
            styles.typeOfTask
          )}
        >
          {typeOfTask}
        </p>
        <p
          className={classNames(
            "text_size_medium",
            "m-0",
            styles.descriptionForTask
          )}
        >
          {descriptionForTask}
        </p>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          buttonType="secondary"
          label="Вернуться"
          onClick={handlePreviousStepClick}
          extClassName={styles.prevButton}
        />
        <Button
          buttonType="primary"
          label="Опубликовать"
          onClick={handleSubmitClick}
        />
      </div>
    </>
  );
};
