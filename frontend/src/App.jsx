import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import SessionPage from "./widgets/layout/SessionPage";
import ResetPassword from "./pages/auth/ResetPassword";
import NewPassword from "./pages/auth/NewPassword";

function App() {
  return (
    <Routes>
       <Route path="/" element={<SignIn />} />
       <Route path="/auth/sign-up" element={<SignUp />} />
       <Route path="/auth/reset" element={<ResetPassword />} />
       <Route path="/auth/change" element={<NewPassword />} />
       <Route path="/sessions" element={<SessionPage />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
