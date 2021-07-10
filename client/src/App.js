import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/details/:forest_name">
            <DetailsPage />
          </Route>
          <Route path="/">
            <SearchPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
