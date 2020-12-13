import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { setNewMessages } from '../../actions/newMessageActions';

const navbarStyle = makeStyles((position) => ({
	nav: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: position.spacing(0),
		color: '#1890ff',
	},
}));

function Navbar(props) {
	const classes = navbarStyle();
	const { user, logoffAction, history, newMessages } = props
	const [anchorEl1, setAnchorEl1] = useState(null);
	const [anchorEl2, setAnchorEl2] = useState(null);

	const isNavMenuOpen = Boolean(anchorEl1);
	const isProfileMenuOpen = Boolean(anchorEl2);

	useEffect(() => {

		setNewMessages(newMessages.length)

	}, [newMessages])

	const handleNavMenuOpen = (event) => {
		setAnchorEl1(event.currentTarget);
	}

	const handleProfileMenuOpen = (event) => {
		setAnchorEl2(event.currentTarget);
	};

	const handleNavMenuClose = () => {
		setAnchorEl1(null);
	};

	const handleProfileMenuClose = () => {
		setAnchorEl2(null);
	};

	const handleLogOut = () => {
		//close all menus
		setAnchorEl1(null);
		setAnchorEl2(null);

		//log user out of redux store
		logoffAction(
			user.user_id
		)

		//Send user home upon logout
		history.push("/")
	}

	const MessageIcon = () =>{
		if(newMessages.length === 0){
			return(
			<IconButton aria-label="show messages" color="inherit">
					<Link to="/UserDashboard/Messaging"><MailIcon /> </Link >
			</IconButton>
			)
		}
		else {
			return (
				<IconButton aria-label="show messages" color="inherit">
					<Badge badgeContent={newMessages.length} color="secondary">
						<Link to="/UserDashboard/Messaging"><MailIcon /> </Link >
					</Badge>
				</IconButton>
			)
		}
	}

	const navMenu = (
		<Menu
			anchorEl={anchorEl1}
			anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isNavMenuOpen}
			onClose={handleNavMenuClose}
		>
			<MenuItem onClick={handleNavMenuClose}><Link to='/'>Home</Link ></MenuItem>
			<MenuItem onClick={handleNavMenuClose}><Link to='/Showtimes'>Showtimes</Link></MenuItem>
		</Menu>
	)

	const userMenu = (
		<Menu
			anchorEl={anchorEl2}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isProfileMenuOpen}
			onClose={handleProfileMenuClose}
		>
			<MenuItem onClick={handleProfileMenuClose}><Link to='/UserDashboard/Profile'>Profile</Link></MenuItem>
			<MenuItem onClick={handleProfileMenuClose}><Link to='/UserDashboard/Tickets'>Tickets</Link></MenuItem>
			<MenuItem onClick={handleLogOut}><Link to='/'>Sign Out</Link></MenuItem>
		</Menu>
	);


	function displayByLoginStatus(user_id, user_type) {
		//No user is logged in
		if (user_id === "") {
			return (
				<div className="noUser">
					<Button color="inherit"><Link to='/SignUp'>Sign Up</Link ></Button>
					<Button color="inherit"><Link to='/Login'>Sign In</Link ></Button>
				</div>
			)
		}
		//admin is logged in
		if (user_type === "A") {
			return (
				<div className={classes.menuButton}>
					<Button
						edge="end" className={classes.menuButton}
						aria-label="user account"
						aria-haspopup="true"
					>
						<Link to='/Movies'>Manage Movies</Link >
					</Button>
					<MessageIcon />
					<IconButton
						edge="end" className={classes.menuButton}
						aria-label="user account"
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
					>
						<AccountCircle style={{paddingBottom: 4}}/>
					</IconButton>
				</div>
			)
		}
		// Customer is logged in
		else {
			return (
				<div className={classes.menuButton}>
					<MessageIcon />
					<IconButton
						edge="end" className={classes.menuButton}
						aria-label="user account"
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
					>
						<AccountCircle style={{paddingBottom: 4}}/>
					</IconButton>
				</div>
			)
		}
	}
	return (
		<div className={classes.nav}>
			<AppBar style={{ background: '#000000' }} position="static">
				<Toolbar>
					<IconButton
						edge="start" className={classes.menuButton}
						aria-label="nav account"
						aria-haspopup="true"
						onClick={handleNavMenuOpen}
					>
						<MenuIcon />
					</IconButton>
					<a href='/'><img className="logo" alt="ACP Theatres logo" src='/images/ACP_THEATRES_LOGO.png' /></a>
					<div className={classes.nav} />
					<div className={classes.menuOptions}>
						{displayByLoginStatus(user.user_id, user.type)}
					</div>
				</Toolbar>
			</AppBar>
			{navMenu}
			{userMenu}
		</div>
	);
}
export default withRouter(Navbar);
