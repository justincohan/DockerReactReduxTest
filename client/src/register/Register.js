import React from "react";
import {useDispatch} from "react-redux";
import { Form, Button, Input } from "antd";
import Icon from "antd/es/icon";
import { useHistory } from "react-router-dom";
import { register } from "./registerActions";


function Register() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let history = useHistory();

  React.useEffect(() => {
    form.setFieldsValue({
      username: '',
      password: '',
    });
  });

  let handleRegister = (values) => {
    dispatch(register(values)).then(() => {
      history.push('/login');
    });
  };

    return (
      <Form onFinish={handleRegister} className="login-form" form={form}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input a username!' }]}>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input a Password!' }]}>
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

export default Register;
