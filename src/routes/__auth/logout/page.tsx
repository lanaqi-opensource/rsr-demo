import { HavePermission, useHavePermission, useLogout } from '@lanaqi/rsr';
import { Helmet } from '@modern-js/runtime/head';

export default function LogoutPage() {
  console.log('LogoutPage');
  const haveGuard = useHavePermission();
  const logout = useLogout();
  return (
    <>
      <Helmet>
        <title>Logout</title>
      </Helmet>
      <div className="size-full">
        <button
          type="button"
          onClick={() => {
            logout();
            console.log('执行了登出');
          }}
        >
          Logout
        </button>
        <HavePermission term={['admin']}>
          <h1>我是admin权限才显示</h1>
        </HavePermission>
        <hr />
        <button
          disabled={!haveGuard(['admin'])}
          type="button"
          onClick={() => {
            console.log('我是admin权限才可点击');
          }}
        >
          我是admin权限才可点击
        </button>
        <br />
        <button
          disabled={!haveGuard(['superadmin'])}
          type="button"
          onClick={() => {
            console.log('我是superadmin权限才可点击');
          }}
        >
          我是superadmin权限才可点击
        </button>
      </div>
    </>
  );
}
