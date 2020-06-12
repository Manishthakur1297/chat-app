import React, { Component } from 'react';
//import { withCookies } from 'react-cookie';
import { axiosInstance }  from "../service/axiosApi";

import UserList from './user_lists'

import CustomModal from './modal';

class User extends Component{

    state = {
        users : [],
        selectedUser: null,
        curr_calorie:0,
        show:false
      }
    
      componentDidMount(){
       this.getUsers()
      }

      getUsers = () => {
        try {
            axiosInstance.get('/users/').then(res => 
                {
                    console.log(res.data)
                    let data = [].concat( res.data );
                    this.setState({users: data})   
    
                }).catch(error => console.log(error))
        } catch (error) {
            throw error;
        }
      }
    
      userClicked = user => {
        console.log(user)
        this.setState({selecteduser: user})
        this.setState({show:true})
    
      }

      hide = () => {
        this.setState({show:false})
        this.getUsers()
      }

    
      render(){
      return (
          <div className="App">
            <section className="container">

              {this.state.show ?
              <CustomModal user={this.state.selecteduser} show={this.state.show} hide={this.hide}/> 
              :
              null}

              <div className="right-half">
                <UserList users={this.state.users} getUsers={this.getUsers} userClicked={this.userClicked} />
                {/* <UserDetails curr_calorie={this.state.curr_calorie} user={this.state.selectedUser} /> */}
              </div>

            </section>

           
          </div>
        );
      }
    }
    

export default User;