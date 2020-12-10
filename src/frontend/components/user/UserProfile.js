import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isoDate } from '../../helper/FormatDate';
import axios from 'axios';
import moment from 'moment';
import { validateDate, displayDateAlert, duplicateEmailAlert } from '../../helper/UserValidation';
import { Form, DatePicker, Button, Alert, Input } from 'antd';




const useStyles = makeStyles((theme) => ({
    root: {

    },

}));

function UserProfile(props) {
    const classes = useStyles();
    const { user, updateAccountAction } = props;
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [birthday, setBirthday] = useState(isoDate(user.birthday));
    const [newPassword, setNewPassword] = useState(null); // do not set this to the current props password, it will update the password in the database and be wrong
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [email, setEmail] = useState(user.email);
    const [sameEmailError, setSameEmailError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [form] = Form.useForm();
    const dateFormat = 'MM/DD/YYYY'

    const isNewPasswordPopulated = newPassword === null ? false : true;

    useEffect(() => {
        //set a 2 second timer
        let timer = setTimeout(() => setSuccess(false), 2000)
        resetFormFields();

        // clear Timeout when component unmounts
        return () => {
            clearTimeout(timer)
        }

    },
        [success] // clearTimeout will run every time this value changes 
    )


    const handleProfileUpdate = (e) => {
        e.preventDefault();
        
        //force form to validate
        form.validateFields()
        //if there are no errors, continue update
        .then(async()=>{
             
            // Check if user email already exists
            await axios.get('/api/user/email/' + email)
                .then(async function (res) {
                    // email address already exists for a different user
                    if (res.data.length > 0 && res.data[0].user_id != user.user_id) {
                        setSameEmailError(true);
                    }

                    //new password was populated and confimrPassword were populated, but passwords don't match
                    else if (newPassword !== null && confirmPassword !== null && newPassword !== confirmPassword) {
                        setConfirmError(true)
                    }

                    // update user if there aren't any errors
                    else if (sameEmailError !== true && confirmError !== true && validateDate(birthday) !== true) {
                        await axios.put('/api/user/' + user.user_id + '/update', {
                            "first_name": firstName,
                            "last_name": lastName,
                            "middle_name": null,
                            "birthday": isoDate(birthday),
                            "email": email,
                            "password": newPassword,
                            "type": user.type,
                            "disabled": null
                        })
                        .then(function(res) {
                            // save the user to the store if update is successful
                            const data = res.data;
                            updateAccountAction(data.user_id, data.first_name, data.last_name, data.middle_name, data.birthday, data.email, data.password, data.type)
                            setSuccess(true)
                        })
                        .catch(function(err){
                            console.log("Failed to update user: ", err)
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });
            })
            .catch((err) => {
                //required fields were not populated
                console.log(err)
            });
    }

    function resetFormFields(){
        form.setFieldsValue({
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            birthday: moment(user.birthday),
            newPassword: null,
            confirmPassword: null
        });

        //reset password fields back to null
        setNewPassword(null);
        setConfirmPassword(null);
    }

    //reset profile information on cancel
    const onCancel = () => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setBirthday(user.birthday);
        setNewPassword(null);
        setConfirmPassword(null);
        setConfirmError(false);
        setSameEmailError(false);
        setSuccess(false);

        resetFormFields();
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

    const onConfirmChange = (event) => {
        const value = event.target.value;
        value.trim() === "" ? setConfirmPassword(null) : setConfirmPassword(value)
        setConfirmError(false);
    }

    const onNewPasswordChange = (event) => {
        const value = event.target.value;
        value.trim() === "" ? setNewPassword(null) : setNewPassword(value);
        setConfirmError(false);
    }

    const ConfirmErrorAlert = () => {
        if (confirmError === true) {
            return (
                <Alert message="The passwords do not match." type="error" showIcon />
            )
        }
        else{
            return(
                null
            )
        }
    }

    const SaveAlert = () => {
        if (success === true) {
            return (
                <Alert message="User information updated!" type="success" showIcon />
            )
        }
        else{
            return(
                null
            )
        }
    }

    return (
        <div className="userUpdateDash" >
            <h1 className="userUpdateDashHeader" >User Information</h1>
            <hr class="blackHr"></hr>
            <div className="userUpdateDashForm">
                <Form
                    form={form}
                    layout="vertical"
                    name="Schedule Movie Form"
                    initialValues={{ remember: true }}
                    footer={[
                        <div style={{ textAlign: "left" }} >

                            <Button key="cancel" size={'middle'} onClick={onCancel}>Close</Button>
                        </div>
                    ]}
                >
                    <Form.Item
                        label="Email"

                        name="email"
                        rules={[{ required: true, message: 'Email is required.' }, {type: 'email', message: "Email is not a valid email."}]}
                    >
                        <Input
                            defaultValue={email}
                            value={email}
                            name="email"
                            className={classes.input}
                            onChange={onEmailChange}
                        />
                    </Form.Item>
                    {duplicateEmailAlert(sameEmailError)}

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'First Name is required.' }]}
                    >
                        <Input
                            defaultValue={firstName}
                            value={firstName}
                            name="firstName"
                            className={classes.input}
                            onChange={onFirstNameChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Last Name is required.' }]}
                    >
                        <Input
                            defaultValue={lastName}
                            value={lastName}
                            name="lastName"
                            className={classes.input}
                            onChange={onLastNameChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Birthday"
                        name="birthday"
                        rules={[{ required: true, message: 'Birthday is required.' }]}
                    >
                        <DatePicker
                            name="birthday"
                            id="birthday"
                            defaultValue={moment(birthday)}
                            value={birthday !== null ? moment(birthday) : null}
                            format={dateFormat}
                            onChange={onBirthdayChange}

                        />
                        
                    </Form.Item>
                    {displayDateAlert(birthday)}

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[{ required: false }]}
                    >
                        <Input.Password
                            defaultValue={newPassword}
                            value={newPassword}
                            className={classes.input}
                            onChange={onNewPasswordChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{  required: isNewPasswordPopulated , message: 'Confirm Password is required.'}]}
                    >
                        <Input.Password
                            defaultValue={confirmPassword}
                            value={confirmPassword}
                            type="password"
                            className={classes.input}
                            onChange={onConfirmChange}
                        />
                    </Form.Item>
                    <ConfirmErrorAlert/>

                    <div className="userUpdateDashActionBar">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            className="userUpdateDashButton"
                            onClick={handleProfileUpdate}
                        >
                            Update
                        </Button>
                        <Button
                            onClick={onCancel}
                            size="large"
                            className="userUpdateDashButton"
                        >
                            Cancel
                        </Button>
                    </div>
                    <SaveAlert/>

                </Form>
            </div>

        </div>
    );
}

export default UserProfile;