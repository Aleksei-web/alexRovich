import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AdminRouter } from "./components/AdminRouter";
import AdminDashboard from "./pages/AdminDashboard";
import Analitics from "./pages/Analitics";
import Login from "./pages/Login";
import NegativeFeedback from "./pages/NegativeFeedback";
import PositiveFeedback from "./pages/PositiveFeedback";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <Router>
      <CookiesProvider>   
        <Switch>
          <Route exact path='/positiveFeedback/:id' component={PositiveFeedback} />
          <Route exact path='/negativeFeedback/:id' component={NegativeFeedback} />
          <AdminRouter exact path='/admin' component={AdminDashboard} />
          <Route exact path='/login' component={Login} />
          <AdminRouter exact path='/analitics' component={Analitics} />
        </Switch>
      </CookiesProvider>
    </Router>
  );
}

export default App;
