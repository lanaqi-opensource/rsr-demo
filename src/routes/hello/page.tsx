import { Helmet } from '@modern-js/runtime/head';

export default function HelloPage() {
  console.log('执行了hello');
  return (
    <>
      <Helmet>
        <title>Hello</title>
      </Helmet>
      <div className="size-full">
        <h1>Hello</h1>
      </div>
    </>
  );
}
