import { useSecurityBlocker } from '@lanaqi/rsr';
import { HavePermission } from '@lanaqi/rsr';
import { Helmet } from '@modern-js/runtime/head';
// import { useBlocker } from '@modern-js/runtime/router';

export default function PlanPage() {
  // 再次使用 useBlocker 则会导致，安全控制的 useBlocker 不能被执行（不要使用该钩子，使用 useSecurityBlocker 来替代实现）
  // const blocker = useBlocker(({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname);
  const { blocked, proceed, reset, path } = useSecurityBlocker();
  return (
    <>
      <Helmet>
        <title>Plan</title>
      </Helmet>
      <div className="size-full">
        <h1>Plan</h1>
        <HavePermission term={['admin']}>
          <h1>我是admin权限才显示</h1>
        </HavePermission>
        <br />
        {blocked && (
          <div>
            <p>是否离开当前页面，导航到 {path?.pathname}</p>
            <hr />
            <button
              type="button"
              onClick={() => {
                console.log('点击了proceed');
                proceed();
              }}
            >
              确认
            </button>
            <br />
            <button
              type="button"
              onClick={() => {
                console.log('点击了reset');
                reset();
              }}
            >
              取消
            </button>
          </div>
        )}
      </div>
    </>
  );
}
