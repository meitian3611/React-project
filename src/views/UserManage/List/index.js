/** @format */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */

// 用户列表
import React, { useState, useEffect } from "react"
import { Table, Divider, Button, Modal, Input } from "antd"
import { findUser, deleteUser } from "../../../api/UserApi"
import CollectionsPage from "../../../components/CollectionsPage"
import Newfile from "../../../components/Newfile"

const List = ({ handleDlete }) => {
  // 用户列表
  const [useList, setList] = useState([])

  // 每页显示条数
  const [limt] = useState(7)

  // 总条数
  const [total, setTotal] = useState(1)

  // 加载
  const [loading, setLoading] = useState(false)

  const { confirm } = Modal
  const { Search } = Input

  // 表头数据
  const columns = [
    {
      title: "用户编号",
      dataIndex: "id"
    },
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "密码",
      dataIndex: "password"
    },
    {
      title: "性别",
      dataIndex: "gender",
      render(col, row) {
        if (row.gender === 1) {
          return "男"
        } else {
          return "女"
        }
      }
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span style={{ display: "flex" }}>
          {/* 修改内容按钮 */}
          <CollectionsPage
            id={record.id}
            changeUser={data => {
              handleChnage(data)
            }}
          />
          <Divider type="vertical" />
          {/* 删除内容按钮 */}
          <Button
            type="danger"
            icon="delete"
            shape="circle"
            onClick={() => {
              return handleDlete(record.id)
            }}
          ></Button>
        </span>
      )
    }
  ]
  const handleChnage = data => {
    setList(data)
  }
  handleDlete = id => {
    confirm({
      title: "是否要删除当前信息?",
      okText: "确认",
      okType: "primary",
      cancelText: "取消",
      width: "500px",
      onOk() {
        deleteUser(id)
        let newData = [...useList]
        const value = newData.findIndex(item => {
          return item.id === id
        })
        newData.splice(value, 1)
        setList(newData)
      }
    })
  }
  useEffect(() => {
    getListPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = page => {
    getListPage(page)
  }

  // 页面数据渲染
  const getListPage = page => {
    // 加载
    setLoading(true)

    findUser({ _page: page, _limit: limt }).then(response => {
      const { data, headers } = response
      setList(data)
      setTotal(parseInt(headers["x-total-count"]))

      // 加载完成...
      setLoading(false)
    })
  }
  const handleAddUser = data => {
    setList(data)
  }

  const handleSearch = value => {
    let searchArr = []
    findUser().then(response => {
      const { data } = response
      data.forEach(item => {
        let username = item.username.split("@")[0]
        if (username.indexOf(value) >= 0) {
          return searchArr.push(item)
        }
      })
      setList(searchArr)
    })
  }
  return (
    <div className="page-list">
      <Search
        placeholder="请输入要搜索的内容"
        enterButton
        size="large"
        onSearch={value => {
          handleSearch(value)
        }}
        style={{ width: "30%", marginBottom: "15px" }}
      />
      <Newfile
        addUser={data => {
          handleAddUser(data)
        }}
      />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={useList}
        loading={loading}
        pagination={{
          total: total,
          defaultPageSize: limt,
          onChange: onChange,
          hideOnSinglePage: true
        }}
      ></Table>
    </div>
  )
}

export default List
