import { Category, ResolveStatus, TaskReport } from 'entities/task/types';
import { UserProfile } from 'entities/user/types';
import { PointGeoJSONInterface } from 'shared/types/point-geojson.types';

export interface TaskButtonsProps {
  taskId: string;
  address: string;
  description: string;
  category: Category;
  date: string | null;
  conflict: boolean;
  extClassName?: string;
  volunteerReport: TaskReport | null;
  recipientReport: TaskReport | null;
  adminResolve: ResolveStatus | null;
  volunteer: UserProfile | null;
  location: PointGeoJSONInterface;
}
