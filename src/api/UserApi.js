/** @format */

import Axios from "axios"

/**
 * 登录接口
 * @param {object} data
 */
export const SignUp = data => {
  return Axios.post("/sign-up", data)
}
/**
 * 注册接口
 * @param {object} data
 */
export const SignIn = data => {
  return Axios.post("/sign-in", data)
}

/**
 * 增加用户
 * @param {object} data
 */
export const addUser = data => {
  return Axios.post("/users", data)
}

/**
 * 删除用户
 * @param {object} params
 */
export const deleteUser = params => {
  return Axios.delete(`/users/${params}`)
}
/**
 * 查询用户
 * @param {object} params
 */
export const findUser = params => {
  return Axios.get("/users", {
    params
  })
}
/**
 * 修改用户
 * @param {object} data
 */
export const listWrite = (id, data) => {
  return Axios.patch(`/users/${id}`, data)
}
