/** @format */

import React from "react"
import { Button, Modal, Form, Input, Radio } from "antd"
import { addUser, findUser } from "../api/UserApi"

/**
 * 新增用户模块
 */
const CreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title="添加用户信息"
          okText="添加"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="用户名">
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "内容不能为空"
                  },
                  { type: "email", message: "请输入正确的邮箱地址！" },
                  { min: 4, message: "账号不能小于4位数" },
                  { max: 20, message: "账号不能大于20位数" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "密码不能为空！" },
                  { min: 6, message: "密码不能小于6位数" },
                  { max: 12, message: "密码不能大于12位数" }
                ]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator("gender", {
                initialValue: 1
              })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)

class NewFile extends React.Component {
  state = {
    visible: false
  }

  showModal = () => {
    // console.log(this.props.id)
    this.setState({ visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleCreate = () => {
    const { form } = this.formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      addUser({
        username: values.username,
        password: values.password,
        gender: values.gender
      }).then(() => {
        findUser().then(response => {
          const { data } = response
          this.props.addUser(data)
        })
      })
      console.log("Received values of form: ", values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    return (
      <div>
        <Button
          icon="plus"
          type="primary"
          onClick={this.showModal}
          style={{ position: "absolute", left: "85%", top: "12%", zIndex: 99 }}
        >
          新增用户
        </Button>
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}
export default NewFile
