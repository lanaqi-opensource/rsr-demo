import { Link, Outlet } from '@modern-js/runtime/router';

export default function AuthLayout() {
  return (
    <div className="size-full">
      <header>
        <h1>Auth</h1>
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
