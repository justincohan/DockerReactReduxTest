import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { Form, Button, Input, Icon } from "antd";

class Login extends React.Component {
  handleLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    console.log(this.props.form);
    this.props.login( {username: this.props.form.getFieldValue('username'), password: this.props.form.getFieldValue('password')} ).then(() => {
      console.log('done');
      this.props.history.push('/todo');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleLogin} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);


export default connect(
  null,
  { login }
)(withRouter(WrappedNormalLoginForm));
// export default AddTodo;
