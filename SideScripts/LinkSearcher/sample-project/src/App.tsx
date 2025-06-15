import React from "react";
import { UserProfile } from "./components/UserProfile";
import { useUserData } from "./hooks/useUserData";
import { GlobalStyle } from "./styles/GlobalStyles";

function App() {
  const { user, isLoading } = useUserData("1");

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <h1>Профиль пользователя</h1>
      <UserProfile user={user} />
    </>
  );
}

export default App;
