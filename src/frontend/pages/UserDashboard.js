import React, { useState } from 'react';
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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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

	const classes = useStyles();
	const [value, setValue] = React.useState('1');
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [middleName, setMiddleName] = useState(user.middle_name);
	const [birthday, setBirthday] = useState(isoDate(user.birthday));
	const [password, setPassword] = useState(null); // do not set this to the current props password, it will update the password in the database and be wrong
	const [email, setEmail] = useState(user.email);
  const [sameEmailError, setSameEmailError] = useState(false);
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
			<TabContext value={value}>
				<AppBar className={classes.menuButton} position="static">
					<TabList className={classes.menuButton} onChange={handleChange} aria-label="dashboard tabs" centered>
						<Tab label="Movies" value="1" />
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
          <h1> This is where I'm invisioning the messages will be displayed to and from the recipients (from the database) < br/>
          and the following button will allow you to send a new message. < br/> The messages would likely be contained in a container
          (white background rounded edges, etc) with the actual message info (recipient, subject, message) displayed. < br/>
          We may also want to think about changing the background color for this messaging page, or just make sure the container is contrasting.</h1>
            <div>
          <Button variant="contained" color="#1890FF" onClick={handleClickOpen}>
            New Message
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Message</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Type a recipient and subject, then send your message.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Recipient"
                type="email"
              />
              <TextField
                autoFocus
                margin="dense"
                id="subject"
                label="Subject"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                multiline
                margin="dense"
                id="message"
                label="Message"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                Send
              </Button>
              <Button onClick={handleClose} color="#1890FF">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        </TabPanel>
      </TabContext>
    </div>
	);
}

export default UserDashboard;