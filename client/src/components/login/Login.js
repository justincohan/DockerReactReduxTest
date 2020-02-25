import React from "react";
import {useDispatch} from "react-redux";
import { Form, Button, Input } from "antd";
import Icon from "antd/es/icon";
import { useHistory } from "react-router-dom";
import {login} from "../../redux/actions";


function Login() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let history = useHistory();

  React.useEffect(() => {
    form.setFieldsValue({
      username: '',
      password: '',
    });
  });

  let handleLogin = (values) => {
    dispatch(login(values)).then(() => {
      history.push('/todo');
    });
  };

    return (
      <Form onFinish={handleLogin} className="login-form" form={form}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
        </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
      </Form>
    );
}

export default Login;
