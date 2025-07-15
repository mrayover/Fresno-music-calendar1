// src/AdminRoute.jsx
import { useUser } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const { user } = useUser();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      setChecked(true);
    }
  }, [user]);

  if (!checked) return <div className="text-white p-4">Loading...</div>;

  if (!user) return <Navigate to="/login" />;
  if (!user.user_metadata?.is_admin)
    return <div className="text-white p-4">Not authorized.</div>;

  return children;
}
