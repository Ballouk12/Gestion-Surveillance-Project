import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import SessionPage from "./widgets/layout/SessionPage";

function App() {
  return (
    <Routes>
       <Route path="/" element={<SignIn />} />
       <Route path="/auth/sign-up" element={<SignUp />} />
       <Route path="/sessions" element={<SessionPage />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
