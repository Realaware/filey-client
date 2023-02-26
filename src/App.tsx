import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./components/pages";
import MainPage from "./components/pages/main";
import { axiosInstance } from "./library/axios";
import { useClientStore, User } from "./zustand";

function App() {
  const clientStore = useClientStore();

  useEffect(() => {
    (async () => {
      const { status, data } = await axiosInstance.get<User>("user/profile");

      if (status === 200) {
        clientStore.setUser(data);
      }
    })();
  }, []);

  return (
    <BrowserRouter basename="app">
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
