import { useHavePermission } from '@lanaqi/rsr';
import { Helmet } from '@modern-js/runtime/head';

export default function SchedulePage() {
  const haveGuard = useHavePermission();
  return (
    <>
      <Helmet>
        <title>Schedule</title>
      </Helmet>
      <div className="size-full">
        <h1>Schedule</h1>
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
