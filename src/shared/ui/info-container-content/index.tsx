import classNames from "classnames";
import styles from "./info-container-content.module.css";

interface IInfoContainerContent {
  name?: string;
  id?: number;
  phoneNumber?: string;
  address?: string;
  description?: string;
}

export const InfoContainerContent = ({
  name = "cmdknsfd",
  id,
  phoneNumber,
  address,
  description,
}: IInfoContainerContent) => (
  <>
    <p
      className={classNames(
        "m-0",
        "text_size_medium",
        "text_type_regular",
        "text",
        styles["info-name-wrapper"]
      )}
    >
      {name}
    </p>
    <p
      className={classNames(
        "m-0",
        "text_size_small",
        "text_type_regular",
        "text",
        styles["info-id-wrapper"]
      )}
    >
      ID {id}
    </p>
    <p
      className={classNames(
        "m-0",
        "text_size_small",
        "text_type_regular",
        "text",
        styles["info-phoneNumber-wrapper"]
      )}
    >
      <span
        className={classNames(
          "m-0",
          "text_size_small",
          "text_type_bold",
          "text"
        )}
      >
        Тел.:
      </span>
      {phoneNumber}
    </p>
    <p
      className={classNames(
        "m-0",
        "text_size_small",
        "text_type_regular",
        "text",
        styles["info-address-wrapper"]
      )}
    >
      <span
        className={classNames(
          "m-0",
          "text_size_small",
          "text_type_bold",
          "text"
        )}
      >
        Адрес:
      </span>
      {address}
    </p>
    <p
      className={classNames(
        "m-0",
        "text_size_small",
        "text_type_regular",
        "text"
      )}
    >
      <span
        className={classNames(
          "m-0",
          "text_size_small",
          "text_type_bold",
          "text"
        )}
      >
        О себе:
      </span>
      {description}
    </p>
  </>
);
