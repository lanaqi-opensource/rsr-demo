import { useSaveSignature } from '@lanaqi/rsr';
import { Helmet } from '@modern-js/runtime/head';

export default function SignaturePage() {
  const signature = useSaveSignature();
  return (
    <>
      <Helmet>
        <title>Signature</title>
      </Helmet>
      <div className="size-full">
        <button
          type="button"
          onClick={() => {
            signature();
            console.log('执行了签名');
          }}
        >
          签名
        </button>
      </div>
    </>
  );
}
