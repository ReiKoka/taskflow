import { use } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
}

export default useAuth;
