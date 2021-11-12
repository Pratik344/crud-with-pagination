import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Componants/Home';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <NavBar /> */}
        <div className="App">
          <>
            <Switch>
              {/* <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route> */}
              <Route exact path="/">
                <Home/>
              </Route>
              {/* <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/update/:id">
                <Update />
              </Route>
              <Route exact path="/profile">
                <ProfileContainer />
              </Route> */}
            </Switch>
            {/* <Homepage/> */}
            {/* <Login/> */}
            {/* <Register/> */}
            {/* <Update/> */}
          </>
        </div>
      </Router>
    </div>
  );
}

export default App;
