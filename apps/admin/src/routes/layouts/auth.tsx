import { Outlet } from "react-router";

/**
 * AuthLayout
 * 이 레이아웃은 인증이 필요한 페이지를 위한 레이아웃입니다.
 */
export default function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
