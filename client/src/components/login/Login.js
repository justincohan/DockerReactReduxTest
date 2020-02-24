import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  updateUsername = username => {
    this.setState({ username });
  };

  updatePassword = password => {
    this.setState({ password });
  };

  handleLogin = () => {
    this.props.login( {username: this.state.username, password: this.state.password} ).then(result => {
      console.log('done');
      this.props.history.push('/todo');
      //window.location = 'localhost:3000/todo';
    });
  };

  render() {
    return (
      <div>
        <div>
          <label>
            Username
            <input
              onChange={e => this.updateUsername(e.target.value)}
              value={this.state.username}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              onChange={e => this.updatePassword(e.target.value)}
              value={this.state.password}
            />
          </label>
        </div>

        <button onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(withRouter(Login));
// export default AddTodo;
