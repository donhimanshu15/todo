import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/action/todoAction'
import { getTodoList } from '../service/todoServices';
import {updateTodo} from '../helper/todoHelper'
import { v1 as uuid} from  'uuid'
import { Table, Tag, Space, Input, Checkbox, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'

 class Dashboard extends Component {
    constructor(props) {
        
super(props)
        this.state = {
          name:"",
          isEdit: false,
editDetails:"",
editId: 0


            

        }

    }
    componentDidMount = async () => {
        
        let response = await getTodoList()
        let finalData= updateTodo(response.data)
        this.props.getTodos(finalData)
        console.log(this.props?.state?.tabledata)
    }
    columns = [

        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Completed',
            render: record => {
                return <>
                    <Checkbox onClick={() => this.oncheck(record)} onChange={(item)=>this.props.completeTodos(item.id)}></Checkbox>
                    {/* {record.completed.toString()} */}


                </>
            },
            key: 'completed',
        },
        
        {
            title: 'Date',
           render: record=>{
         
            return moment(record.date).format('MMMM Do YYYY, h:mm:ss a');
                   
                  
               
           },
            key: 'date',
        },
        {
            title: 'Action',
            key: 'aciton',
            render: record => {
                return <>

                    <EditOutlined onClick={() => this.onEdit(record)} />
                    <DeleteOutlined onClick={() => this.onDelete(record)} style={{ color: "red", marginLeft: 12 }} />


                </>
            }


        }]
      
        addButton=()=>{
this.props.addTodos({
    id: uuid(),
    title: this.state.name,
    
});
this.setState({name:""})
        }
        onDelete=(record)=>{
this.props.removeTodos(record.id)
        }
   onChang=(e)=>{
      console.log(e.target.checked)
   }
   oncheck=(record)=>{
      
this.props.completeTodos(record.id)
   }
   onResetEdit = () => {
    this.setState({ isEdit: false })
    this.setState({ editDetails: null })
}
onEdit = (record) => {
    this.setState({ isEdit: true })
    this.setState({editId:record.id})
    this.setState({ editDetails: { ...record } })
}
  render() {
    return (
       
      <>
       <div className='addtodobox'>
                    <div className='inputbox'>
                        <Input placeholder='ADD TODO.....'
                            onChange={(e) => this.setState({ name: e.target.value })}
                            value={this.state.name}

                        />
                    </div>
                    <Button type="primary" onClick={()=>this.addButton()}>
                        Add
                    </Button >

                </div>
       <Table columns={this.columns} dataSource={this.props?.state?.tabledata.filter(val => val.completed === false) }></Table>
       <Modal title="Edit details"
                    visible={this.state.isEdit}
                    okText="Save"
                    onCancel={() => { this.onResetEdit() }}
                    onOk={(record) => {
                       
                   this.props.updateTodos({id: this.state.editId,title:this.state.editDetails})
this.onResetEdit()
                    }}>

                   
                    <Input value={this.state.editDetails?.title} onChange={(e) => {
                        this.setState({ editDetails: e.target.value })
                    }} />
                 


                </Modal>
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
removeTodos:(payload) => dispatch(actions.removeTodos(payload)),
addTodos: (payload) => dispatch(actions.addTodos(payload)),
updateTodos: (payload) => dispatch(actions.updateTodos(payload)),
completeTodos: (payload) => dispatch(actions.completeTodos(payload)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
// 1. Layout page - Dashboard, History 
//2. Dashborad- Add todo button,
//3. Input box-title  and save it with Date.now and append it
//4. history box- completed items
//5. Dashboard- incomplete items