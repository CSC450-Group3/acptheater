import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from '../components/util/Loader'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles(() => ({
	root: {
		background: 'white',
		minHeight: "90vh",
	},
	messages: {
		margin: 20
	}
}));

function MessageThread(props) {
	const classes = style();
	const { thread_id, user_id } = props.computedMatch.params; //computed due to the protected route
	const [messages, setMessages] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [open, setOpen] = React.useState(false);
	const [newMessage, setNewMessage] = useState("");
	const [sentSuccessfully, setSetSuccessfully] = useState(false);

	useEffect(() => {
		async function getMessages() {
			//load the messages for the given thread
			//the passed in user gets entered as a participant if they weren't already
			//this also flags the messages as read in the database
			await axios.get('/api/message/thread/' + thread_id + '/user/' + user_id)
				.then(function (res) {
					setMessages(res.data)
					setIsLoading(false)
				})
				.catch(function (err) {
					console.log(err)
				});
		}

		if(sentSuccessfully){
			//reset data for more messages
			setSetSuccessfully(false);
			setIsLoading(false)
		}


		getMessages();

		return () => {
            //reload the new messages upon component unmount
            props.loadNewMessages(props.user);
        }

	}, [thread_id, user_id, sentSuccessfully])



	useEffect(() => {
		// Update the document title using the browser API
		document.title = `ACP | Messages`;
	});

	const handleSendNewMessage = async () => {

		await axios.post('/api/message/create', {
			thread_id: thread_id,
			sending_user_id: user_id,
			message_body: newMessage
		})
			.then(function (res) {
				setSetSuccessfully(true)
				setOpen(false)
			})
			.catch(function (err) {
				console.log(err)
			})


	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};


	const Messages = () => {
		const messageData = [];

		Object.keys(messages).map(key => {
			messageData.push(
				<div key={messages[key].message_id}>
					<Row>
						<Col span={6} >
							<div style={{ textAlign: "left" }}>
								<p>From: {messages[key].first_name} {messages[key].last_name}
									<br />
							Sent: {messages[key].sent_date_time}
								</p>
							</div>


						</Col>
						<Col>
							{messages[key].body}

						</Col>
						<Divider orientation="left"></Divider>
					</Row>
				</div>
			)
		})

		return (messageData);
	}

	return (
		<div className={classes.root}>
			{isLoading ? <Loader /> :
				<div className={classes.content}>
					<h2>{messages[0].subject}</h2>
					<div className={classes.messages}>
						<Messages />
						
						<Button type="primary" variant="contained"  onClick={handleClickOpen}>
							Reply
						</Button>
						
						<Link to='/UserDashboard/Messaging'>
							<Button variant="contained"  >
								Back
							</Button>
						</Link>

						<div className="reply">
							<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
								<DialogTitle id="form-dialog-title">Message</DialogTitle>
								<DialogContent>
									<DialogContentText>
										Type a message and click send to respond on this thread.
									</DialogContentText>
									<TextField
										autoFocus
										multiline
										margin="dense"
										id="message"
										label="Message"
										type="text"
										fullWidth
										value={newMessage}
										onChange={event => setNewMessage(event.target.value)}
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
			}
		</div>

	);
}
export default withRouter(MessageThread);
