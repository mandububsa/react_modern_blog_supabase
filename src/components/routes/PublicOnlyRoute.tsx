import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";

// 로그인하지 않은 사용자만 접근 가능
export default function PublicOnlyRoute() {
  const location = useLocation();
  const isLoading = useAuthStore((state) => state.isLoading);
  const claims = useAuthStore((state) => state.claims);
  if (isLoading) return null;
  if (claims) {
    const to = location.state?.from.pathname ?? "/"; // (널 병합): 좌변이 null 또는 undefined 일 때만 우변 사용. || 는 빈문자열도 우변 되기에 안됨.
    return <Navigate to={to} replace />;
  }
  return <Outlet />;
}
