import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from 'src/pages/home';
const routes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/',
    component: Home,
  },
];
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(route => (
          <Route component={route.component} path={route.path} key={route.path} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};
export default App;
