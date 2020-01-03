/** @format */

import React from "react"
import ReactDOM from "react-dom"
import Axios from "axios"

import App from "./App"
import "./base.scss"

// 全局处理 axios 的 baseURL

// 本地使用
Axios.defaults.baseURL = "http://localhost:9090"

// 项目上线使用
// Axios.defaults.baseURL = "http://111.230.185.20:9090"

ReactDOM.render(<App />, document.getElementById("root"))
