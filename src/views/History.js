import React, { Component } from 'react'
import { Table, Tag, Space, Input, Checkbox } from 'antd';
import './tablecomp.css'
import 'antd/dist/antd.less'
import { getTodoList } from '../service/todoServices';
import { taskcompleted, updateTodo } from '../helper/todoHelper'
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/action/todoAction'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import { timetaken, dateSet } from '../helper/todoHelper'
class History extends Component {

  columns = [

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: 'Time Taken',
      render: record => {

        const t = timetaken(record.starting_date, record.completed_date)

        return t + " " + "days"



      },
      key: 'date',
    },

  ]
  render() {
    // const task = taskcompleted(this.props?.state?.tabledata)
    // console.log(task)
    const dte = Array.from(dateSet(this.props?.state?.tabledata));

    return (
      <>
        {dte.map(elemnet => (
          <>
            <div className='taskbox'>

              <div className='bo'> <h3> <div className='bo1'>Date : {elemnet} </div> <div className='bo2'>completed: {this.props?.state?.tabledata.filter(val => val.completed === true && val.completed_date == elemnet).length}</div> </h3></div>
              <Table columns={this.columns} dataSource={this.props?.state?.tabledata.filter(val => val.completed === true && val.completed_date == elemnet)}></Table>
            </div>
          </>))}


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

