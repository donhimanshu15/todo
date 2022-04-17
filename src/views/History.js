import React, { Component } from 'react'
import { Table, Tag, Space, Input, Checkbox } from 'antd';
import './tablecomp.css'
import 'antd/dist/antd.less'
import { getTodoList } from '../service/todoServices';
import { updateTodo } from '../helper/todoHelper'
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/action/todoAction'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
class History extends Component {

  columns = [

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: 'Date',
      render: record => {
        console.log(record.date)
        return moment(record.date).format('MMMM Do YYYY, h:mm:ss a');



      },
      key: 'date',
    },

  ]
  render() {
    return (
      <>
        <Table columns={this.columns} dataSource={this.props?.state?.tabledata.filter(val => val.completed === true)}></Table>
      </>
    )
  }

}
const mapStateToProps = (props) => {
  return {
    state: props.reducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: (payload) => dispatch(actions.getTodos(payload)),
    removeTodos: (payload) => dispatch(actions.removeTodos(payload)),
    addTodos: (payload) => dispatch(actions.addTodos(payload)),
    updateTodos: (payload) => dispatch(actions.updateTodos(payload)),
    completeTodos: (payload) => dispatch(actions.completeTodos(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(History)

