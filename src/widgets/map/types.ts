export interface Data {
  id: number;
  recipientAdressCoordinates: [number, number];
  isUrgentTask: boolean;
  recipientName?: string;
  recipientPhoneNumber?: string;
  avatarName?: string;
  avatarLink?: string;
  description?: string;
  count?: string;
}
