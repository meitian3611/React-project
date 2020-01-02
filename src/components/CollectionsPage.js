/** @format */

import React from "react"
import { Button, Modal, Form, Input, Radio } from "antd"
import { listWrite, findUser } from "../api/UserApi"

const CreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title="修改用户信息"
          okText="保存"
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

class CollectionsPage extends React.Component {
  state = {
    visible: false,
    loading: false
  }

  showModal = () => {
    // console.log(this.props.id)
    this.setState({ visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false, loading: false })
  }

  handleCreate = () => {
    this.setState({ loading: true })
    const { form } = this.formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      listWrite(this.props.id, {
        username: values.username,
        password: values.password,
        gender: values.gender
      }).then(() => {
        findUser().then(response => {
          const { data } = response
          this.props.changeUser(data)
        })
      })
      console.log("Received values of form: ", values)
      form.resetFields()
      this.setState({ visible: false, loading: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
          icon="edit"
          shape="circle"
        ></Button>
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
export default CollectionsPage
