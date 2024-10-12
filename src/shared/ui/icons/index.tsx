import { FC, useMemo } from 'react';
import type { IIconProps } from './utils';
import { CalendarIcon } from './calendar-icon';
import { ClockIcon } from './clock-icon';
import { ReadMessageIcon } from './read-message-icon';
import { MenuIcon } from './menu-icon';
import { PhoneIcon } from './phone-icon';
import { EmptyMessageIcon } from './empty-message-icon';
import { ExitIcon } from './exit-icon';
import { PersonIcon } from './person-icon';
import { WriteMessageIcon } from './write-message-icon';
import { LockIcon } from './lock-icon';
import { LocationIcon } from './location-icon';
import { SettingsIcon } from './settings-icon';
import { ArrowIcon } from './arrow-icon';
import { PinIcon } from './pin-icon';
import { SendIcon } from './send-icon';
import { EditIcon } from './edit-icon';
import { CloseIcon } from './close-icon';
import { CloseCrossIcon } from './close-cross-icon';
import { VkIcon } from './vk-icon';
import { DoneIcon } from './done-icon';
import { ActiveApplicationIcon } from './active-application-icon';
import { RegistrationIcon } from './registration-icon';
import { StatisticIcon } from './statistic-icon';
import { BallsIcon } from './balls-icon';
import { BlockIcon } from './block-icon';
import { ContactsIcon } from './contacts-icon';
import { FilterIcon } from './filter-icon';
import { FinishedApplicationIcon } from './finished-application-icon';
import { KeyIcon } from './key-icon';
import { MapApplicationIcon } from './map-application-icon';
import { MapIcon } from './map-icon';
import { PopularIcon } from './popular-icon';
import { CompletedApplicationIcon } from './completed-application-icon';
import { CreateApplication } from './create-application-icon';
import { LoginIcon } from './login-icon';
import { PasswordOpenIcon } from './password-open-icon';
import { PasswordCloseIcon } from './password-close-icon';
import { CheckIcon } from './check-icon';
import { ArrowDownIcon } from './arrow-down-icon';
import { ArrowNotify } from './arrow-notify';
import { ExcelIcon } from './excel-icon';
import { AddMediumIcon } from './add-icon';

import { ExclamationPointIcon } from './exclamation-point-icon';
import { ExclamationPMark } from './excalamation-mark';

import { ConflictIcon } from './conflict-icon';
import { AccordionIconArrow } from './accordion-arrow';
import { TilesIcon } from './tiles-icon';
import { ListIcon } from './list-icon';
import { CheckInBoxIcon } from './check-in-box';
import { PlusFilledIcon } from './plus-filled-icon';
import { NewAdminIcon } from './new-admin-icon';
import { CloseIconThin } from './close-icon-thin';
import { UnionIcon } from './union-icon';
import { FileAttachmentIcon } from './file-attachment-icon';

const icons = {
  ExcelIcon,
  ExclamationPMark,
  ExclamationPointIcon,
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
  ArrowNotify,
  PinIcon,
  SendIcon,
  EditIcon,
  CloseIcon,
  CloseCrossIcon,
  VkIcon,
  DoneIcon,
  ActiveApplicationIcon,
  BallsIcon,
  BlockIcon,
  CompletedApplicationIcon,
  RegistrationIcon,
  StatisticIcon,
  ContactsIcon,
  FilterIcon,
  FinishedApplicationIcon,
  KeyIcon,
  MapApplicationIcon,
  MapIcon,
  PopularIcon,
  CreateApplication,
  LoginIcon,
  PasswordOpenIcon,
  PasswordCloseIcon,
  CheckIcon,
  CloseIconThin,
  UnionIcon,
  ArrowDownIcon,
  ConflictIcon,
  AccordionIconArrow,
  CheckInBoxIcon,
  PlusFilledIcon,
  NewAdminIcon,
  TilesIcon,
  ListIcon,
  AddMediumIcon,
  FileAttachmentIcon,
};

type TIcons = Record<keyof typeof icons, FC<IIconProps>>;

export interface IconProps extends IIconProps {
  icon: keyof TIcons;
}

export function Icon({ icon, ...props }: IconProps) {
  const RenderIcon = useMemo(() => icons[icon], [icon]);

  return <RenderIcon {...props} />;
}
