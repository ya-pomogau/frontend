import { FC, ReactNode } from "react";
import { UserCard } from "shared/ui/user-card";
import { CategoriesBackground } from "shared/ui/categories-background";
import styles from "./styles.module.css";

interface RequestCardProps {
  requestCardId: number;
  userAvatar: string;
  userName: string;
  userId: number;
  userPhoneNumber: string;
}

const RequestCard: FC<RequestCardProps> = ({
  requestCardId,
  userAvatar,
  userName,
  userId,
  userPhoneNumber,
}) => (
  <UserCard
    userId={userId}
    userName={userName}
    userNumber={userPhoneNumber}
    avatarLink={userAvatar}
    avatarName={`Аватар пользователя ${userName}`}
  >
    <CategoriesBackground theme="primary" />
  </UserCard>
);

export default RequestCard;
