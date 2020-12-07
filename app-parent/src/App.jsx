import React from 'react';

const RemoteChild = React.lazy(() => import('child/App'));

const App = () => {
  const [needLazy, toggleLazy] = React.useState(false);

  return (
    <div>
      <h1>App</h1>

      <button onClick={() => toggleLazy(true)}>Show lazy</button>

      {needLazy && (
        <React.Suspense fallback={<div>Loading child app...</div>}>
          <RemoteChild />
        </React.Suspense>
      )}
    </div>
  );
};

export default App;
