import React from 'react';
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

const navbarStyle = makeStyles((theme) => ({
  nav: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    display: 'none',
  },
  navColor: {
    color: 'inherit',
  },
  navbar: {
    display: 'none',
  },
}));

function NavbarAdmin() {
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
    <MenuItem onClick={handleNavMenuClose}>Home</MenuItem>
    <MenuItem onClick={handleNavMenuClose}>Movies</MenuItem>
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
    <MenuItem onClick={handleManageMenuClose}>Movies</MenuItem>
    <MenuItem onClick={handleManageMenuClose}>Seats</MenuItem>
  </Menu>
  );

  return (
    <div className={classes.nav}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start" className={classes.menuButton}
            color="inherit"
            aria-label="nav account"
            aria-haspopup="true"
            onClick={handleNavMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.acptheater} variant="h6" noWrap>
            ACP Theater
          </Typography>
          <div className={classes.nav} />
          <div>
            <Button 
                edge="end" className={classes.menuButton}
                aria-label="user account"
                aria-haspopup="true"
                onClick={handleManageMenuOpen}
                color="inherit"
            >
                Manage</Button>
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
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {navMenu}
      {userMenu}
      {manageMenu}
    </div>
  );
}

export default NavbarAdmin;