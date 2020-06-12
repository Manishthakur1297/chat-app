import React, { Component } from "react";
import { Row, FormGroup, FormControl, FormLabel, Button, FormText } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../shared/validator';
import { registerInstance }  from "../service/axiosApi";


class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains Signup form data
            errors: {}, // Contains login field errors
            loading: false // Indicates in progress state of login form
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateRegisterForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.name)) {
            errors.name = "Name can't be blank";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 1, lte: 16, trim: true })) {
            errors.password = "Password's length must between 1 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    register = (async e => {

        e.preventDefault();

        let errors = this.validateRegisterForm();

        if(errors === true){
            try {
                    const res = await registerInstance.post('/register/', {
                    name: this.state.formData.name,
                    email: this.state.formData.email,
                    password: this.state.formData.password
                });
                console.log(res)
                window.location.href = '/'
            } catch (error) {
                throw error;
            }
        } else {
            this.setState({
                errors: errors
            });
        }
    })

    render() {

        const { errors } = this.state;

        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.register}>
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                        { errors.email &&
                            <FormText>{errors.email}</FormText>
                        }
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Username</FormLabel>
                            <FormControl type="text" name="name" placeholder="Enter your Username" onChange={this.handleInputChange} />
                        { errors.name &&
                            <FormText>{errors.name}</FormText>
                        }
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                        { errors.password &&
                            <FormText>{errors.password}</FormText>
                        }
                        </FormGroup>
                        <Button type="submit">Sign Up</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Signup;