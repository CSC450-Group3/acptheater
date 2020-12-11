import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Form, Button, Alert, Input } from 'antd';

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isInvalidLogin, setInvalidLogin] = useState("");
	const [isError, setError] = useState(false);
	const [history] = useState(props.history);
	const [form] = Form.useForm();

	useEffect(() => {
		// Update the document title using the browser API
		document.title = `ACP | Login`;

		// sets the form's initial values
		form.setFieldsValue({
			email: email,
			newPassword: password,
		});
	});
	

	async function login(e) {
		e.preventDefault();

		//force form to validate
		form.validateFields()
			.then(async () => {
				// Attempt to find user in the database
				await axios.post('/api/user/authenticate', {
					email: email,
					password: password
				})
					.then(function (res) {
						//user found successfully
						if (res.data.length ===  1) {
							console.log(res.data[0])
							const user = res.data[0]
							//sent logged in user to the redux store
							props.loginAction(
								user.user_id,
								user.first_name,
								user.last_name,
								user.middle_name,
								user.birthday,
								user.email,
								user.password,
								user.type
							)
							setInvalidLogin(false);
							setError(false);

							//redirect to home page upon successful login
							history.push("/");
						}
						else if( res.data.length === 0){
							// Invalid credentials were entered
							setInvalidLogin(true);
							setError(false);
						}
						else{
							// Something unexpected happened -- there shouldn't be more than one person with the same email
							setInvalidLogin(false);
							setError(true);
						}
					})
					.catch(function (err) {
						// Something unexpected happened
						setInvalidLogin(false);
						setError(true);
						
					});
			})
			.catch((err) => {
				//form fields were not populated
				//console.log(err)
			})

	}
	function failedLogin(invalidLogin, failedLogin) {
		if (invalidLogin) {
			return (
				<Alert message="Invalid email or password." type="error" showIcon />
			)
		}
		if (failedLogin) {
			return (
				<Alert message="Error: an unexpected error occured." type="error" showIcon />
			)
		}
	}

	const onEmailChange = (event) => {
		setEmail(event.target.value);
		setError(false);
		setInvalidLogin(false);
	}

	const onPasswordChange = (event) => {
		setPassword(event.target.value);
		setError(false);
		setInvalidLogin(false);
	}

	return (
		<div className="loginBody" >
			<Form
				form={form}
				layout="vertical"
				name="Login Form"
				initialValues={{ remember: true }}
				className="login"
			>
				<h1>Sign In</h1>
				<Form.Item
					label="Email"
					name="email"
					className="login-input"
					rules={[
						{ required: true, message: 'Email is required.' },
						{ type: 'email', message: "Email is not a valid email." }
					]}
				>
					<Input
						autoFocus
						value={email}
						name="email"
						onChange={onEmailChange}
						className="login-input"
					/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					className="login-input"
					rules={[{ required: true, message: 'Password is required.' }]}
				>
					<Input.Password
						value={password}
						type="password"
						onChange={onPasswordChange}
						className="login-input"
					/>
				</Form.Item>
				{failedLogin(isInvalidLogin, isError)}

				<div className="userUpdateDashActionBar">
					<Button
						htmlType="submit"
						type="primary"
						size="large"
						onClick={login}
					>
						Log In
					</Button>

				</div>

			</Form>

			<div className="userCreationAlreadyMember">
				Not with us yet? Create a new account <Link to='/SignUp'>here</Link >.
			</div>
		</div>
	);
}

export default withRouter(Login);