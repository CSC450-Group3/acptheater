import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import axios from 'axios';
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
import UserProfile from '../components/user/UserProfile';


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	menuButton: {
		backgroundColor: '#1890FF',
		color: 'black',
	},
	formWrapper:{
		marginBottom: '100px'
	}
}));

function UserDashboard(props) {
	const { user, history, updateAccountAction } = props;
	const { tab_name } = props.computedMatch.params; //computed due to the protected route
	const classes = useStyles();
	/* profile data*/
	const [tab, setTab] = React.useState('1');

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


				<TabPanel value="2" >
					<div className={classes.formWrapper}>
						<UserProfile 
							user={user}
							updateAccountAction={updateAccountAction}
						/>
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
