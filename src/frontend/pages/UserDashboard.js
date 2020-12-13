import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { withRouter } from "react-router-dom";
import UserProfileDashboard from '../components/user/UserProfileDashboard';
import UserMessagingDashboard from '../components/user/UserMessageDashboard';
import UserTicketDashboard from '../components/user/UserTicketDashboard';


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
	const [tab, setTab] = React.useState('1');

	useEffect(()=>{
		//set the tab based on the URL
		switch(tab_name){
			case 'Messaging':
				setTab('3');
				document.title = `ACP | Messaging`;
				break;
			case 'Profile':
				setTab('2');
				document.title = `ACP | Profile`;
				break;
			case 'Tickets':
				document.title = `ACP | Tickets`;
				setTab('1')
				break;
			default:
				//default to Tickets if an incorrect URL is entered
				history.replace({ pathname: `/UserDashboard/Tickets`})
				setTab('1');
		}
		
	},[ tab_name, history])


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
			default:
				//default to the first tab if all else fails
				history.replace({ pathname: `/UserDashboard/Tickets`})
				break;

		}

	};

	return (
		<div className={classes.root} className="userDash">
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
						<UserTicketDashboard
							user={user}
							history={history}
							tab_name={tab_name}
						/>
					</div>
				</TabPanel>


				<TabPanel value="2" >
					<div className={classes.formWrapper}>
						<UserProfileDashboard 
							user={user}
							updateAccountAction={updateAccountAction}
						/>
					</div>
				</TabPanel>

				<TabPanel value="3">
					<div className="inboxContainer">
						<UserMessagingDashboard 
							user={user}
							history={history}
						/>
					</div>
				</TabPanel>
			</TabContext>
		</div>
	);
}

export default withRouter(UserDashboard);
