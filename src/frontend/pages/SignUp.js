import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { isoDate } from '../helper/FormatDate'
import { validateDate, displayDateAlert, duplicateEmailAlert } from '../helper/UserValidation'
import { Form, DatePicker, Button, Alert, Input, Checkbox  } from 'antd';
import moment from 'moment';

function UserCreation(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsConditions, setTermsConditions] = useState(false);
    const [sameEmailError, setSameEmailError] = useState(null);
    const [history] = useState(props.history);
    const [form] = Form.useForm();
    const dateFormat = 'MM/DD/YYYY'

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `ACP | Sign Up`;
    });

    async function signUp(e) {
        e.preventDefault();

         //force form to validate
         form.validateFields()
         //if there are no errors, continue attempted save
         .then(async() => {
              
            // Check if user email already exists
            await axios.get('/api/user/email/' + email)
                .then(async function (res) {

                    //email address already exists for an account
                    if (res.data.length > 0) {
                        setSameEmailError(true);
                    }

                    // Attempt to create new user there aren't errors
                    else if (sameEmailError !== true && termsConditions !== 0 && validateDate(birthday) !== true) {
                        await axios.post('/api/user/create', {
                            first_name: firstName,
                            last_name: lastName,
                            middle_name: null,
                            birthday: isoDate(birthday),
                            email: email,
                            password: password,
                            type: 'C', // hard code customer
                            diabled: null //new accounts are not disabled
                        })
                        .then(function (res) {
                            //user created successfully
                            if (res.status === 200) {
                                const user = res.data
                                //redirect to login screen upon successful creation
                                history.push("/Login");
                            }
                        })
                        .catch(function (err) {
                            // print error
                            console.log(err);
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });
        })
        .catch((err) => {
            //form validation errors - required fields weren't populated correctly
            //console.log(err)
        })
    }

    const onEmailChange = (event) => {
        const value = event.target.value;
        value.trim() === "" ? setEmail(null) : setEmail(value)
        setSameEmailError(false);
    }

    const onFirstNameChange = (event) => {
        const value = event.target.value;
        value.trim() === "" ? setFirstName(null) : setFirstName(value)
    }

    const onLastNameChange = (event) => {
        const value = event.target.value;
        value.trim() === "" ? setLastName(null) : setLastName(value)
    }

    const onBirthdayChange = (value) => {
        setBirthday(value)
    }

    const onPasswordChange = (event) => {
        const value = event.target.value;
        value.trim() === "" ? setPassword(null) : setPassword(value)
    }

    const onTermsChange = (event) => {
        const value = event.target.checked;
        setTermsConditions(value)
        form.setFieldsValue({
            termsConditions: value
        })
    }

    
    const onCancel = () =>{
        //route to the home page 
        history.push("/");
    }

    return (
        <div className="userCreationWelcome">
                <div className="userCreationForm">
                    <h1 className="userCreationHeader">Become A Part Of The <br></br>ACP Theatres Family</h1>
                    <hr></hr>
                    <Form
                    form={form}
                    layout="vertical"
                    name="Schedule Movie Form"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ 
                            required: true, 
                            message: 'Email is required.' 
                        }, 
                        {
                            type: 'email',
                             message: "Email is not a valid email."
                        }]}
                    >
                        <Input
                            autoFocus
                            defaultValue={email}
                            value={email}
                            name="email"
                            onChange={onEmailChange}
                        />
                    </Form.Item>
                    {duplicateEmailAlert(sameEmailError)}

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ 
                            required: true, 
                            message: 'First Name is required.' 
                        }]}
                    >
                        <Input
                            value={firstName}
                            name="firstName"
                            onChange={onFirstNameChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ 
                            required: true, 
                            message: 'Last Name is required.' 
                        }]}
                    >
                        <Input
                            value={lastName}
                            name="lastName"
                            onChange={onLastNameChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Birthday"
                        name="birthday"
                        rules={[{ 
                            required: true, 
                            message: 'Birthday is required.' 
                        }]}
                    >
                        <DatePicker
                            name="birthday"
                            id="birthday"
                            value={birthday !== null ? moment(birthday) : null}
                            format={dateFormat}
                            onChange={onBirthdayChange}

                        />               
                    </Form.Item>
                    {displayDateAlert(birthday)}

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ 
                            required: true, 
                            message: 'Password is required.' 
                        }]}
                    >
                        <Input.Password
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Terms & Conditions"
                        name="termsConditions"
                        rules={[{ 
                                    required: true, 
                                    message: 'Please agree to the terms and conditions.',
                                }
                        ]}   
                    >
                        <Checkbox
                            checked={termsConditions}
                            onChange={onTermsChange}
                        >
                            I agree to ACP Theatres Terms & Conditions
                        </Checkbox>
                    </Form.Item>

                    <div className="userUpdateDashActionBar">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            className="userUpdateDashButton"
                            onClick={signUp}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={onCancel}
                            size="large"
                            className="userUpdateDashButton"
                        >
                            Cancel
                        </Button>
                    </div>

                </Form>

                </div>
                <p></p>
                <div className="userCreationAlreadyMember">
                    Already have an account? <Link to='/Login'>Login here</Link >.
                </div>
        </div>
    );
}

export default withRouter(UserCreation);