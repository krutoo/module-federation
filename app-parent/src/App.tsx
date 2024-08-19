import { lazy, useState, Suspense } from "react";

const RemoteChild = lazy(() => import("child/App"));

export function App() {
  const [shown, setShown] = useState(false);

  return (
    <div>
      <h1>Parent app</h1>

      {!shown && (
        <>
          <button onClick={() => setShown(true)}>Show child app</button>
        </>
      )}

      {shown && (
        <Suspense fallback={<div>Loading child app...</div>}>
          <RemoteChild />
        </Suspense>
      )}
    </div>
  );
}
