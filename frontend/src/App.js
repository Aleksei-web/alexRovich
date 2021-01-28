import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Analitics from "./pages/Analitics";
import Login from "./pages/Login";
import NegativeFeedback from "./pages/NegativeFeedback";
import PositiveFeedback from "./pages/PositiveFeedback";

function App() {
  return (
    <Router>      
      <Switch>
        <Route exact path='/positiveFeedback/:id' component={PositiveFeedback} />
        <Route exact path='/negativeFeedback/:id' component={NegativeFeedback} />
        <Route exact path='/admin' component={AdminDashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/analitics' component={Analitics} />
      </Switch>
    </Router>
  );
}

export default App;
