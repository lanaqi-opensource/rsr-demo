import { HavePermission, useHavePermission } from '@lanaqi/rsr';
import { Helmet } from '@modern-js/runtime/head';

export default function HomePage() {
  console.log('HomePage');
  const haveGuard = useHavePermission();
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="size-full">
        <h1>Home</h1>
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
