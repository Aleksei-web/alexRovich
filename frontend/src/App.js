import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminRouter } from "./components/AdminRouter";
import AdminDashboard from "./pages/AdminDashboard";
import Analitics from "./pages/Analitics";
import Login from "./pages/Login";
import NegativeFeedback from "./pages/NegativeFeedback";
import PositiveFeedback from "./pages/PositiveFeedback";
import { CookiesProvider } from "react-cookie";
import Workers from "./pages/Workers";
import Reasons from "./pages/Reasons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
        <Switch>
          <Route
            exact
            path="/positiveFeedback/:id"
            component={PositiveFeedback}
          />
          <Route
            exact
            path="/negativeFeedback/:id"
            component={NegativeFeedback}
          />
          <AdminRouter exact path="/workers" component={Workers} />
          <Route exact path="/bye" component={PositiveFeedback} />
          <AdminRouter exact path="/reasons" component={Reasons} />
          <Route exact path="/login" component={Login} />
          <AdminRouter exact path="/analitics" component={Analitics} />
        </Switch>
    </Router>
  );
}

export default App;
