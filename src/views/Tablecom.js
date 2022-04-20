import React, { Component } from 'react'
import { connect } from 'react-redux';
import './tablecomp.css'
import * as actions from '../store/action/todoAction'
import { getTodoList } from '../service/todoServices';
import {updateTodo} from '../helper/todoHelper'
import { v1 as uuid} from  'uuid'
import { DatePicker } from 'antd';
import { Table, Tag, Space, Input, Checkbox, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'

 class Dashboard extends Component {
     
    constructor(props) {
        
super(props)
        this.state = {
          name:"",
          isEdit: false,
          isAdd:false,
            editDetails:"",
            addDetails:"",
            dte:"",
        editId: 0,


            

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
            render: record=>{
         
               if(record.completed) return <>{record.title.strike()} </>
               else return record.title
                       
                      
                   
               },
            key: 'title',
        },
        {
            title: 'Completed',
            render: record => {
                
                return <>
                
                    <Checkbox checked={record.completed} onClick="" onChange={() => this.oncheck(record) }></Checkbox>
                    {/* {record.completed.toString()} */}


                </>
            },
            key: 'completed',
        },
        
        {
            title: 'Starting Date',
           // dataIndex: 'starting_date',
          render: record=>{
         
           return moment(record.date).format('YYYY/MM/DD');
                   
                  
               
           },
            key: 'date',
        },
        {
            title: 'Completion Date',
           render: record=>{

            return <DatePicker defaultValue={moment()} format={'YYYY/MM/DD'}  onChange={(date, dateString)=> {this.props.dateSeter({id: record.id, completed_date:dateString})} } />
                   
            // 
               
           },
        // dataIndex: 'completed_date',
            key: 'completed_date',
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
            this.setState({isAdd: true})
// this.props.addTodos({
//     id: uuid(),
//     title: this.state.name,
    
// });
// this.setState({name:""})
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
onResetAdd = () => {
    this.setState({ isAdd: false })
    this.setState({ addDetails: null })
}
onEdit = (record) => {
    this.setState({ isEdit: true })
    this.setState({editId:record.id})
    this.setState({ editDetails: { ...record } })
}
ondateChange=(date, dateString)=> {
  
   this.setState({dte: dateString})
  }

  render() {
    return (
       
      <>
       <div className='addtodobox'>
                  
                    <Button type="primary" className='addbu' onClick={()=>this.addButton()}>
                        Add
                    </Button >

                </div>
       <Table className='tablebox' columns={this.columns} dataSource={this.props?.state?.tabledata }></Table>
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
                <Modal title="Add User"
                   visible={this.state.isAdd}
                    okText="Save"
                    onCancel={() => { this.onResetAdd() }}
                    onOk={(record) => {
                       console.log(this.state.date)
                        this.props.addTodos({
                            id: uuid(),
                            title: this.state.name,
                            date:this.state.date
                        });
                        this.setState({name:""})
                       
this.onResetAdd()
                    }}>

                   <div>
                   <div>  <Input placeholder='ADD TODO.....'
                            onChange={(e) => this.setState({ name: e.target.value })}
                            value={this.state.name}

                        />
                 </div>
                
                 </div>
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
dateSeter: (payload) => dispatch(actions.dateSeter(payload)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
// 1. Layout page - Dashboard, History 
//2. Dashborad- Add todo button,
//3. Input box-title  and save it with Date.now and append it
//4. history box- completed items
//5. Dashboard- incomplete items