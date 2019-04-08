import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Logout from "./components/logout";
import RegisterForm from "./components/RegisterForm";
import NotFoundComponent from "./components/NotFoundComponent";
import NavBar from "./components/Navbar";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <main className="container">
          <NavBar user={user} />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/home" component={Home} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFoundComponent} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
