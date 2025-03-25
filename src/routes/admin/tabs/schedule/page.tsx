import { type AccessContext, type AccessPath, type AccessResource, useCustomBlocker, useHavePermission } from '@lanaqi/rsr';
import { Helmet } from '@modern-js/runtime/head';

export default function SchedulePage() {
  useCustomBlocker((context: AccessContext, currentPath: AccessPath, currentResource: AccessResource | null) => {
    return !window.confirm('是否导航到['.concat(currentPath.pathname).concat(']，你确定吗？'));
  });
  return (
    <>
      <Helmet>
        <title>Schedule</title>
      </Helmet>
      <div className="size-full">
        <h1>Schedule</h1>
      </div>
    </>
  );
}
