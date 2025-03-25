import { Helmet } from '@modern-js/runtime/head';

export default function DeniedPage() {
  return (
    <>
      <Helmet>
        <title>Denied</title>
      </Helmet>
      <div className="size-full">
        <h1>没有权限</h1>
      </div>
    </>
  );
}
