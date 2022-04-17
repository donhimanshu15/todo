import React, { Component } from 'react'
import './tablecomp.css'
import {
  Link

} from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];



export default class Layoutcomp extends Component {
  render() {
    return (
      <Menu mode="inline" style={{ width: 256, height: "100%", backgroundColor: "", borderRight: "1px solid black" }}>

        <Menu.Item key="3" style={{ color: 'black', fontSize: "20px", paddingLeft: 33, textDecoration: 'none', marginBottom: "20px", marginTop: "10px" }}><Link to="/" >DashBoard </Link></Menu.Item>
        <Menu.Item key="4" style={{ color: 'black', fontSize: "20px", paddingLeft: 33, textDecoration: 'none' }}> <Link to="/history">History</Link></Menu.Item>


      </Menu>
    )
  }
}
