import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { isoDate } from '../helper/FormatDate';
import axios from 'axios';
import { validateDate, displayDateAlert, duplicateEmailAlert } from '../helper/UserValidation';
import MovieTicketDashboard from '../components/user/MovieTicketDashboard';
import { Button, Col, Card, Row } from 'antd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Inbox from '../components/message/Inbox';
import { withRouter } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	menuButton: {
		backgroundColor: '#1890FF',
		color: 'black',
	},
}));

function UserDashboard(props) {
	const { user, history, updateAccountAction } = props;
	const { tab_name } = props.match.params;
	const classes = useStyles();
	/* profile data*/
	const [tab, setTab] = React.useState('1');
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [middleName, setMiddleName] = useState(user.middle_name);
	const [birthday, setBirthday] = useState(isoDate(user.birthday));
	const [password, setPassword] = useState(null); // do not set this to the current props password, it will update the password in the database and be wrong
	const [email, setEmail] = useState(user.email);
	const [sameEmailError, setSameEmailError] = useState(false);


	/* Message data */
	const [open, setOpen] = React.useState(false);
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [sentSuccessfully, setSetSuccessfully] = useState(false);

	useEffect(()=>{
		//set the tab based on the URL
		switch(tab_name){
			case 'Messaging':
				setTab('3');
				break;
			case 'Profile':
				setTab('2');
				break;
			case 'Tickets':
				setTab('1')
				break;
			default:
				//default to Tickets if an incorrect URL is entered
				history.replace({ pathname: `/UserDashboard/Tickets`})
				setTab('1');
		}

		if(sentSuccessfully){
			//reset data (also forces rerender)
			setSetSuccessfully(false)
		}
		
	},[sentSuccessfully, tab_name])



	console.log(tab)
	const handleSendNewMessage = async () => {
		//Create the thread record 
		await axios.post('/api/thread/create', {
			subject: subject,
			resolved: 0,
			user_id: user.user_id
		})
			.then(async function (res) {
				//create the message for the thread
				await axios.post('/api/message/create', {
					thread_id: res.data.thread_id,
					sending_user_id: user.user_id,
					message_body:  message 
				})
					.then(function (res) {
						setSetSuccessfully(true)
						setOpen(false)
					})
					.catch(function (err) {
						console.log(err)
					})
			})
			.catch(function (err) {
				console.log(err)
			});
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleChange = (event, newValue) => {
		setTab(newValue);

		//Update the URL based on the selected tab
		switch(newValue){
			case '3':
				history.replace({ pathname: `/UserDashboard/Messaging`})
				break;
			case '2':
				history.replace({ pathname: `/UserDashboard/Profile`})
				break;
			case '1':
				history.replace({ pathname: `/UserDashboard/Tickets`})
				break;
		}

	};

	const handleProfileUpdate = async (e) => {
		e.preventDefault();

		// Check if user email already exists
		await axios.get('/api/user/email/' + email)
			.then(function (res) {
				//email address already exists for a different user
				if (res.data.length > 0 && res.data[0].user_id != user.user_id) {
					setSameEmailError(true);
				}
				// update user if there isn't any errors
				else if (sameEmailError !== true && validateDate(birthday) !== true) {
					updateAccountAction(
						user.user_id,
						firstName,
						lastName,
						middleName,
						birthday,
						email,
						password,
						user.type
					)
				}
			})
			.catch(function (err) {
				console.log(err)
			});
	}

	return (
		<div className={classes.root} class="userDash">
			<TabContext value={tab}>
				<AppBar className={classes.menuButton} position="static">
					<TabList className={classes.menuButton} onChange={handleChange} aria-label="dashboard tabs" centered>
						<Tab label="Tickets" value="1" />
						<Tab label="Profile" value="2" />
						<Tab label="Messaging" value="3" />
					</TabList>
				</AppBar>

				<TabPanel value="1">
					<div>
						<MovieTicketDashboard
							user={user}
							history={history}
						/>
					</div>
				</TabPanel>


				<TabPanel value="2" className="userUpdateDash">
					<h1 >User Information</h1>
					<hr class="blackHr"></hr>
					<div class="column" className="userCreationColumn">
						<p></p>
						<form method="post" onSubmit={handleProfileUpdate}>
							<div>
								<input
									value={email}
									type="email"
									placeholder="Email"
									name="email"
									required
									className={classes.input}
									onChange={event => {
										setEmail(event.target.value);
										setSameEmailError(false);
									}
									}
								/>
								{duplicateEmailAlert(sameEmailError)}
							</div>
							<p></p>
							<p></p>
							<div>
								<input
									value={firstName}
									type="text"
									placeholder="First Name"
									name="fName"
									required
									className={classes.input}
									onChange={event => setFirstName(event.target.value)}
								/>
								<input
									value={lastName}
									type="text"
									placeholder="Last Name"
									name="lName"
									required
									className={classes.input}
									onChange={event => setLastName(event.target.value)}
								/>
							</div>
							<p></p>
							<p></p>
							<div>
								<input
									value={birthday}
									type="date"
									required
									className={classes.input}
									onChange={event => setBirthday(event.target.value)}
								/>
								{displayDateAlert(birthday)}
							</div>
							<p></p>
							<p></p>
							<div>
								<button type="submit" >Update</button>
							</div>
						</form>
					</div>
				</TabPanel>

				<TabPanel value="3">
					<div className="inboxContainer">
						<div className="inbox">
							<p>Inbox</p>
							<Inbox 
								user = {user}
								history={history}
								reload={sentSuccessfully}
							/>
							<div className="newMessage">
								{
									/* display New Message button to customers only - admin's only reply to messages from customers */
									user.type === 'C' ?
										<Button type="primary" variant="contained" color="#1890FF" onClick={handleClickOpen}>
											New Message
										</Button>
										: null
								}
								<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
									<DialogTitle id="form-dialog-title">Message</DialogTitle>
									<DialogContent>
										<DialogContentText>
											Type a subject and a message, then send your message.
                   						</DialogContentText>
										<TextField
											autoFocus
											margin="dense"
											id="subject"
											label="Subject"
											type="text"
											fullWidth
											value={subject}
											onChange={event => setSubject(event.target.value)}
											required
										/>
										<TextField
											multiline
											margin="dense"
											id="message"
											label="Message"
											type="text"
											fullWidth
											value={message}
											onChange={event => setMessage(event.target.value)}
											required
										/>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleSendNewMessage} variant="contained" color="primary">
											Send
                    					</Button>
										<Button onClick={handleClose} color="#1890FF">
											Cancel
                    					</Button>
									</DialogActions>
								</Dialog>
							</div>
						</div>
					</div>
				</TabPanel>
			</TabContext>
		</div>
	);
}

export default withRouter(UserDashboard);
