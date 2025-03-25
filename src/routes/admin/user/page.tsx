import { Helmet } from '@modern-js/runtime/head';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <div className="size-full">
        <h1>User</h1>
      </div>
    </>
  );
}
