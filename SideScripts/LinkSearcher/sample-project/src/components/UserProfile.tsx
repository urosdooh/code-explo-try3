import React from "react";
import { formatDate } from "../utils/formatData";
import type { User } from "../types";

interface UserProfileProps {
  user: User | null;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    return <p>Пользователь не найден.</p>;
  }

  return (
    <div>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Имя:</strong> {user.name}
      </p>
      <p>
        <strong>Дата регистрации:</strong> {formatDate(user.registered)}
      </p>
    </div>
  );
};
