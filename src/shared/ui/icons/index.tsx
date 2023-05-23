import { FC, useMemo } from "react";
import type { IIconProps } from "./utils";

import { CalendarIcon } from "./calendar-icon";
import { ClockIcon } from "./clock-icon";
import { ReadMessageIcon } from "./read-message-icon";
import { MenuIcon } from "./menu-icon";
import { PhoneIcon } from "./phone-icon";
import { EmptyMessageIcon } from "./empty-message-icon";
import { ExitIcon } from "./exit-icon";
import { PersonIcon } from "./person-icon";
import { WriteMessageIcon } from "./write-message-icon";
import { LockIcon } from "./lock-icon";
import { LocationIcon } from "./location-icon";
import { SettingsIcon } from "./settings-icon";
import { ArrowIcon } from "./arrow-icon";
import { PinIcon } from "./pin-icon";
import { SendIcon } from "./send-icon";
import { EditIcon } from "./edit-icon";
import { CloseIcon } from "./closee-icon";
import { VkIcon } from "./vk-icon";
import { DoneIcon } from "./done-icon";

const icons = {
  CalendarIcon,
  ClockIcon,
  ReadMessageIcon,
  MenuIcon,
  PhoneIcon,
  EmptyMessageIcon,
  ExitIcon,
  PersonIcon,
  WriteMessageIcon,
  LockIcon,
  LocationIcon,
  SettingsIcon,
  ArrowIcon,
  PinIcon,
  SendIcon,
  EditIcon,
  CloseIcon,
  VkIcon,
  DoneIcon,
};

type TIcons = Record<keyof typeof icons, FC<IIconProps>>;

export interface IconProps extends IIconProps {
  icon: keyof TIcons;
}

export function Icon({ icon, ...props }: IconProps) {
  const RenderIcon = useMemo(() => icons[icon], [icon]);

  return <RenderIcon {...props} />;
}
