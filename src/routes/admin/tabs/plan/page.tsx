import { HavePermission } from '@lanaqi/rsr';
import { Helmet } from '@modern-js/runtime/head';

export default function PlanPage() {
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
      </div>
    </>
  );
}
