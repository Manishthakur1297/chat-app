import React, { Component } from 'react';
import { axiosInstance }  from "../service/axiosApi";

class UserList extends Component{

    state = {

    }

    userClicked = user => evt => {
        this.props.userClicked(user);
    }


    user_delete = user => evt => {
        console.log(user)
        try {
            axiosInstance.delete(`/users/${user.id}`).then(res => 
                {
                    this.props.getUsers()
                }).catch(error => console.log(error))
        } catch (error) {
            throw error;
        }
    }

    render() {

            return (
                <div>
                    <h2>Users List</h2>
                    {   
                        
                        this.props.users.map( user => {
                            return <div key={user.id} className="user-item">

                                ID : {user.id}<br />
                                Username : {user.name}<br />
                                Email : {user.email}<br />
                            </div>

                        })
                    }
                </div>

        )
    }
}

export default UserList;