import { FC } from "react";
import type { IIconProps } from "./utils";

export * from "./calendar-icon";
export * from "./clock-icon"
export * from "./read-message-icon"
export * from "./menu-icon"
export * from "./phone-icon"
export * from "./empy-message-icon"
export * from "./exit-icon"
export * from "./person-icon"
export * from "./write-message-icon"
export * from "./lock-icon"
export * from "./location-icon"
export * from "./settings-icon"
export * from "./arrow-icon"
export * from "./pin-icon"
export * from "./send-icon"
export * from "./edit-icon"
export * from "./closee-icon"
export * from "./vk-icon"
export * from "./done-icon"


export type TStatusIcons = {
  CalendarIcon: FC<IIconProps>;
  ClockIcon: FC<IIconProps>;
  ReadMessageIcon: FC<IIconProps>;
  MenuIcon: FC<IIconProps>;
  PhoneIcon: FC<IIconProps>;
  EmpyMessageIcon: FC<IIconProps>;
  ExitIcon: FC<IIconProps>;
  PersonIcon: FC<IIconProps>;
  WriteMessageIcon: FC<IIconProps>;
  LockIcon: FC<IIconProps>;
  LocationIcon: FC<IIconProps>;
  SettingsIcon: FC<IIconProps>;
  ArrowIcon: FC<IIconProps>;
  PinIcon: FC<IIconProps>;
  SendIcon: FC<IIconProps>;
  EditIcon: FC<IIconProps>;
  CloseIcon: FC<IIconProps>;
  VkIcon: FC<IIconProps>;
  DoneIcon: FC<IIconProps>;
};
