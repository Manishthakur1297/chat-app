import React, { useState, useEffect } from "react";
import { Switch } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import './style.css'
import User from "./users/users"

import { axiosInstance } from "./service/axiosApi";

import {Nav, Navbar} from 'react-bootstrap'

import PrivateRoute from '../components/route/PrivateRoute'

import PublicRoute from '../components/route/PublicRoute'

const App = () => {
  
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(localStorage.getItem('user'))

  const handleLogout = event => {
    try {
          localStorage.removeItem('token');
          axiosInstance.defaults.headers['Authorization'] = null;
          localStorage.removeItem('user')
          window.location.href = '/'
    }
    catch (e) {
        console.log(e);
    }
};

        return (

          <div>
            { !token ?
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Chat IO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                </Navbar.Collapse>
            </Navbar>

            :

            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">Chat IO</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/users">Profile</Nav.Link>
              </Nav>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <b>{user}</b>
                    
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Navbar.Collapse>
            </Navbar>
            
          
          }
                <main>

                    <Switch>
                        {/* <Route exact path={"/login/"} render={() => <Login handler = {this.handler} />}/> */}
                        <PublicRoute restricted={true} exact path={"/login/"} component={Login}/>
                        <PublicRoute restricted={true} exact path={"/signup/"} component={Signup}/>
                        <PrivateRoute exact path={"/dashboard/"} component={User}/>
                        <PrivateRoute exact path={"/users/"} component={User}/>
                        <PublicRoute restricted={true} path={"/"} component={Login} />
                    </Switch>
                </main>
            </div>
        );
    }

export default App;