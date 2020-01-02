/** @format */

import React from "react"
import ReactDOM from "react-dom"
import Axios from "axios"

import App from "./App"
import "./base.scss"

// 全局处理 axios 的 baseURL
Axios.defaults.baseURL = "http://localhost:9090"

ReactDOM.render(<App />, document.getElementById("root"))
