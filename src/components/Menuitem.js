/** @format */

import React from "react"
import { withRouter } from "react-router-dom"
import { Menu, Avatar, Badge } from "antd"

/**
 * 头像模块
 */

const { SubMenu } = Menu
class Menuitem extends React.PureComponent {
  state = {
    current: "mail"
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{ marginTop: "-47px", borderBottom: "none" }}
      >
        <SubMenu
          style={{ float: "right", top: "-5px" }}
          title={
            <span className="submenu-title-wrapper">
              <Badge count={"99+"}>
                <Avatar
                  shape="square"
                  size="large"
                  icon="user"
                  src="https://i.loli.net/2019/12/31/C2A4ihxotVrwMvZ.jpg"
                />
              </Badge>
            </span>
          }
        >
          <Menu.ItemGroup title="技术相关">
            <Menu.Item key="setting:1">
              <a href="https://meitian3611.github.io"> 个人博客</a>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <a href="https://ant.design/index-cn">Ant Design</a>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="操作">
            <Menu.Item
              key="setting:3"
              onClick={() => {
                this.props.history.replace("/")
              }}
            >
              返回首页
            </Menu.Item>
            <Menu.Item
              key="setting:4"
              onClick={() => {
                window.sessionStorage.setItem("user", null)
                this.props.history.go(0)
              }}
            >
              退出登录
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    )
  }
}

export default withRouter(Menuitem)
