/** @format */

import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Row, Col, Form, Icon, Input, Button, message } from "antd"
import { SignIn } from "../../api/UserApi"

class Login extends React.PureComponent {
  state = {
    loading: false
  }

  handleSubmit = e => {
    // 重定向首页的数据
    const { history, location, handleLogin, form } = this.props

    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        SignIn(values).then(response => {
          const { data } = response
          if (data.code === 0) {
            handleLogin(data.data)
            message.success("欢迎回来！管理员", 1, () => {
              // fakeAuth.authenticate(() => {
              // 登录成功回到首页
              let redirect = location.state ? location.state.redirect : "/"
              history.replace(redirect)
              // })
            })
          } else {
            message.error(data.msg, 1, () => {
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
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    return (
      <div className="page-login">
        <Row className="page-login_row" type="flex" align="middle">
          <Col span={8} offset={8}>
            <div>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  <h1 className="login-form_title">后台管理系统</h1>
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form_button"
                    loading={loading}
                  >
                    登录
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="Default" className="login-form_button">
                    <Link to="/register">注册</Link>
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

export default connect(null, dispatch => {
  return {
    handleLogin(user) {
      dispatch({
        type: "LOGIN",
        user
      })
    }
  }
})(Form.create()(Login))
