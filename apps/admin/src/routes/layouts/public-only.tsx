import { Outlet } from "react-router";

/**
 * PublicOnly
 * 이 레이아웃은 로그인하지 않은 사용자만 볼 수 있는 페이지를 위한 레이아웃입니다.
 */
export default function PublicOnlyLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
