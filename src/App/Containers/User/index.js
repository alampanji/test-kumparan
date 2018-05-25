import React from 'react';
import {Row, Col, Table, Button, Modal} from 'antd';
import HeaderTitle from '../../Components/HeaderTitle';
import MainButton from '../../Components/MainButton';
import Constant from '../../../config/constant';
import DetailUser from '../../Components/DetailUser'
import {connect} from 'react-redux';
import {getDetailUser, getPostUser} from '../../../reducers/user_list/action'
import './index.scss';

class User extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            modalDetail: false
        }
        this.getDetail = this.getDetail.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    componentDidMount(){
        this.getData();
    }
    
    async getData(){
        const response = await fetch(Constant.MASTER_PATH_API + Constant.URL_GET_USER);
        const data = await response.json();
        const constructPayload = data.map(obj=>
            ({...obj, key:obj.id}
        ))
        this.setState({
            data:constructPayload,
        })
    }



    getDetail(id){
       this.props.getDetailUser(id);
       this.setState({
           modalDetail: true
       })
    }

    modalClose(){
        this.setState({
            modalDetail: false
        })
    }

    render(){
          
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            }, 
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
            }, 
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Detail',
                dataIndex: 'id',
                key: 'id',
                render: (id) => (
                    <MainButton action={()=>this.getDetail(id)} label={`DETAIL`} />
                )
            }
        ];
          

        return(
            <div className="user-container">
                <HeaderTitle title={`User`} subtitle={`List of User Application`}/>
                <Table dataSource={this.state.data} columns={columns} />

                <Modal
                    title="Detail User"
                    visible={this.state.modalDetail}
                    onCancel={this.modalClose}
                    footer={null }
                    width="50%"
                    >
                    {
                        this.props.user !== undefined ? 
                            <DetailUser {...this.props.user} />
                        : null
                    }
                </Modal>
            </div>
        )
    }
    
}

const mapStateToProps = state=>{
    return{
        user: state.user_list.detail
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        getDetailUser: (id)=>{
            dispatch(getDetailUser(id)),
            dispatch(getPostUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (User);