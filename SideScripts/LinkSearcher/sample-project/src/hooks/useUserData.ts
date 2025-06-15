import { useState, useEffect } from "react";
import { fetchUser } from "../utils/api";
import type { User } from "../types";

export const useUserData = (userId: string) => {
  // Указываем, что состояние может быть User или null
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser(userId);
      setUser(userData); // <-- Теперь здесь нет ошибки
      setIsLoading(false);
    };

    getUser();
  }, [userId]);

  return { user, isLoading };
};
