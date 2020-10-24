import React, {useState} from 'react';
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
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  
  const isNavMenuOpen = Boolean(anchorEl1);
  const isProfileMenuOpen = Boolean(anchorEl2);
  const isManageMenuOpen = Boolean(anchorEl3);

  const handleNavMenuOpen = (event) => {
    setAnchorEl1(event.currentTarget);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleManageMenuOpen = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setAnchorEl1(null);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl2(null);
  };

  const handleManageMenuClose = () => {
    setAnchorEl3(null);
  };

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
    <MenuItem onClick={handleNavMenuClose}><Link to='/HomeMovies'>Movies</Link></MenuItem>
    <MenuItem onClick={handleNavMenuClose}>Concessions</MenuItem>
    <MenuItem onClick={handleNavMenuClose}>Showtimes</MenuItem>
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
      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>Sign Out</MenuItem>
    </Menu>
  );

  const manageMenu = (
    <Menu
    anchorEl={anchorEl3}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isManageMenuOpen}
    onClose={handleManageMenuClose}
  >
    <MenuItem onClick={handleManageMenuClose}><Link to='/Movies'>Movies</Link ></MenuItem>
    <MenuItem onClick={handleManageMenuClose}>Seats</MenuItem>
  </Menu>
  );


  function displayByLoginStatus(user_id, user_type){
    console.log("User_id", user_id)
    //No user is logged in
    if(user_id === ""){
      return(
        <div className="noUser">
          <Button color="inherit"><Link to='/SignUp'>SignUp</Link ></Button>
          <Button color="inherit"><Link to='/Login'>Login</Link ></Button>
        </div>
      )
    }
    //dmin is logged in
    if(user_type === "A"){
      return(
        <div>
          <Button
              edge="end" className={classes.menuButton}
              aria-label="user account"
              aria-haspopup="true"
              onClick={handleManageMenuOpen}
          >
            Manage
          </Button>
          <IconButton aria-label="show messages" color="inherit">
            <Badge badgeContent={1} color="secondary">
              <MailIcon />
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
        <div className="loggedInUser">
            <IconButton aria-label="show messages" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <MailIcon />
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
            ACP Theater
          </Typography>
          <div className={classes.nav} />
          <div className={classes.menuOptions}>    
            {displayByLoginStatus(props.user.user_id, props.user.type)}
          </div>
          
        </Toolbar>
      </AppBar>
      {navMenu}
      {userMenu}
      {manageMenu}
    </div>
  );
}

export default Navbar;
