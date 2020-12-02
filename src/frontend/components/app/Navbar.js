import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

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
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const isNavMenuOpen = Boolean(anchorEl1);
  const isProfileMenuOpen = Boolean(anchorEl2);

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
    props.logoffAction(
      props.user.user_id
    )
    
    //Send user home upon logout
    props.history.push("/")
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
      <MenuItem onClick={handleProfileMenuClose}><Link to='/UserDashboard'>Profile</Link></MenuItem>
      <MenuItem onClick={handleLogOut}><Link to='/'>Sign Out</Link></MenuItem>
    </Menu>
  );


  function displayByLoginStatus(user_id, user_type){
    //No user is logged in
    if(user_id === ""){
      return(
        <div className="noUser">
          <Button color="inherit"><Link to='/SignUp'>Sign Up</Link ></Button>
          <Button color="inherit"><Link to='/Login'>Sign In</Link ></Button>
        </div>
      )
    }
    //admin is logged in
    if(user_type === "A"){
      return(
        <div className={classes.menuButton}>
          <Button
              edge="end" className={classes.menuButton}
              aria-label="user account"
              aria-haspopup="true"
          >
            <Link to='/Movies'>Manage Movies</Link >
          </Button>
          <IconButton aria-label="show messages" color="inherit">
            <Badge badgeContent={1} color="secondary">
              <Link to= "/UserDashboard"><MailIcon /> </Link >
            </Badge>
          </IconButton>
          <IconButton
            edge="end" className={classes.menuButton}
            aria-label="user account"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
        </div>
      )
    }
    // Customer is logged in
    else{
      return(
        <div className={classes.menuButton}>
            <IconButton aria-label="show messages" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <Link to= "/UserDashboard"><MailIcon /> </Link >
              </Badge>
            </IconButton>
            <IconButton
              edge="end" className={classes.menuButton}
              aria-label="user account"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
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
          <Typography variant="p" noWrap>
            <Link to="/">ACP Theater</Link>
          </Typography>
          <div className={classes.nav} />
          <div className={classes.menuOptions}>
            {displayByLoginStatus(props.user.user_id, props.user.type)}
          </div>

        </Toolbar>
      </AppBar>
      {navMenu}
      {userMenu}
    </div>
  );
}
export default withRouter(Navbar);
