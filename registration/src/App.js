import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import _ from 'lodash'
import { routeList } from './routes'
import PublicRoute from './routes/routes'


const App = () => {
  return (
    <Router>
      <Switch>
        {
          _.map(routeList, (route) => (
            <PublicRoute
              key="publicRoute"
              exact
              path={route.path}
              component={route.component}
            />
          ))
        }
      </Switch>
    </Router>
  )
}

export default App
