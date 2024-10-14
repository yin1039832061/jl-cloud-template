import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './routes';
import HOC from './components/HOC';
function App() {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {
            routes.map(route=>(
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))
          }
        </Routes>
      </Suspense>
    </div>
  )
}

export default HOC(App);
