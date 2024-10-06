import {
  AdminPermission,
  DatabaseIdAndTimestampsInterface,
  UserRole,
  UserStatus,
} from './common.types';
import { PointGeoJSONInterface } from './point-geojson.types';

export interface UserInterface extends DatabaseIdAndTimestampsInterface {
  name: string;
  phone: string;
  avatar: string;
  address: string;
  vkId: string;
  role: UserRole;
}

export interface VolunteerInterface extends UserInterface {
  score: number;
  status: UserStatus;
  location: PointGeoJSONInterface;
  keys: boolean;
  tasksCompleted: number;
}

export interface RecipientInterface extends UserInterface {
  status: UserStatus;
  location: PointGeoJSONInterface;
}

export interface AdminInterface extends UserInterface {
  permissions: AdminPermission[];
  login: string;
  password: string;
  isRoot: boolean;
  isActive: boolean;
}

export interface AnyUserInterface
  extends UserInterface,
    Partial<Omit<VolunteerInterface, keyof UserInterface>>,
    Partial<Omit<RecipientInterface, keyof UserInterface>>,
    Partial<Omit<AdminInterface, keyof UserInterface>> {}
