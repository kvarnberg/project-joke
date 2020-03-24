import React from "react";
import "./App.css";
import Home from "./components/Home";
import Random from "./components/Random";
import Jokes from "./components/Jokes";
import About from "./components/About";
import Nav from "./components/Nav";
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  login = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.setState({ userInfo: u.user });
      })
      .catch(error => {
        alert(error);
      });
  };

  signup = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        const db = firebase.firestore();
        db.collection("users")
          .doc(u.user.uid)
          .set({ user: u.user.email });
      })
      .catch(error => {
        alert(error);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <Router>
            <div className="Nav">
              <Nav />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/random" component={Random} />
                <Route
                  path="/jokes"
                  render={props => <Jokes {...props} user={this.state.user} />}
                />
                <Route path="/about" component={About} />
                <Route
                  path="*"
                  component={() => "404 NOT FOUND IN THIS APP-UNIVERSE"}
                />
              </Switch>
            </div>
          </Router>
        ) : (
          <div>
            <form id="signForm">
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="enter email"
              ></input>
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="enter password"
              ></input>
              <button type="submit" onClick={this.login}>
                Login
              </button>
              <button onClick={this.signup}>Signup</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default App;
