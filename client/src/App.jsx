import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserProfileInfo from "./pages/UserProfileInfo";
import HomePage from "./pages/HomePage";
import Templete from "./pages/templete/Templete";
function App() {
  const data = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={data ? <HomePage /> : <SignUpPage />} />
          <Route
            path="/login"
            element={data ? <HomePage /> : <LoginPage />}
          ></Route>
          <Route path="/users/:id" element={<Templete />} />
        </Routes>
      </BrowserRouter>
      {/* <Templete /> */}
    </div>
  );
}

export default App;
