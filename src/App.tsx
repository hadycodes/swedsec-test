import "./App.css";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { store } from "./store";
import OAuthPage from "./pages/OAuthPage";

import Authenticated from "./components/common/Authenticated";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticated>
              <HomePage />
            </Authenticated>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth" element={<OAuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
