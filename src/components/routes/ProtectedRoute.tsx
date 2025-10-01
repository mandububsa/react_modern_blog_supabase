import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";

// 로그인한 사용자만 접근 가능
export default function ProtectedRoute() {
  const location = useLocation();
  const isLoading = useAuthStore((state) => state.isLoading);
  const claims = useAuthStore((state) => state.claims);
  if (isLoading) return null;
  if (!claims) {
    alert("먼저 로그인 해주세요.");
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }
  return <Outlet />;
}
