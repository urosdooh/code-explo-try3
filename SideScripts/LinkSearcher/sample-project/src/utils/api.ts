export const fetchUser = async (userId: string) => {
  console.log(`Запрашиваем пользователя с ID: ${userId}`);
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: userId,
    name: "Иван Иванов",
    registered: new Date(),
  };
};
