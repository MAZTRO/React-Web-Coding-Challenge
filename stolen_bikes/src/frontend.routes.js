import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Index = lazy(() => import('./pages/index/IndexPage'))
const P404 = lazy(() => import('./pages/page404/P404'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='loandingSuspence'>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Index />}/>
          <Route path="*" element={<P404 />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
