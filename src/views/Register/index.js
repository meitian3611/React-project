/** @format */

import React from "react"
// import { Link } from "react-router-dom"
// import fakeAuth from "../../fakeAuth"

import { Row, Col, Form, Icon, Input, Button, Radio, message } from "antd"
import { SignUp } from "../../api/UserApi"
class Register extends React.PureComponent {
  state = {
    gender: 1,
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        SignUp(values).then(response => {
          const { data } = response
          if (data.code === 0) {
            message.success("恭喜您注册成功！", 2, () => {
              // 成功后跳转到登录页面
              this.props.history.push("/login")
            })
          } else {
            message.error(data.msg, 2, () => {
              this.setState({
                loading: false
              })
            })
          }
        })
      }
    })
  }
  render() {
    const { loading } = this.state

    const { getFieldDecorator } = this.props.form
    return (
      <div className="page-register">
        <Row className="page-login_row" type="flex" align="middle">
          <Col span={8} offset={8}>
            <div>
              <Form onSubmit={this.handleSubmit} className="register-form">
                <Form.Item>
                  <h1 className="register-form_title">Register</h1>
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "账号不能为空！" },
                      { type: "email", message: "请输入正确的邮箱地址！" },
                      { min: 4, message: "账号不能小于4位数" },
                      { max: 20, message: "账号不能大于20位数" }

                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "密码不能为空！" },
                      { min: 6, message: "密码不能小于6位数" },
                      { max: 12, message: "密码不能大于12位数" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("gender", {
                    rules: [{ required: true, message: "请选择一项" }],
                    initialValue: this.state.gender
                  })(
                    <Radio.Group>
                      <Radio value={1}>男</Radio>
                      <Radio value={2}>女</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form_button"
                    loading={loading}
                  >
                    完成注册
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(Register)
