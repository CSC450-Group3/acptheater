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
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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

function NavbarUser() {
  const classes = navbarStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const userMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
    </Menu>
  );

  const navMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>Home</MenuItem>
    <MenuItem onClick={handleMenuClose}>Movies</MenuItem>
    <MenuItem onClick={handleMenuClose}>Concessions</MenuItem>
    <MenuItem onClick={handleMenuClose}>Showtimes</MenuItem>
  </Menu>
  )

  return (
    <div className={classes.grow}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start" className={classes.menuButton}
            color="inherit"
            aria-label="nav account"
            aria-haspopup="true"
            onClick={handleNavMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.acptheater} variant="h6" noWrap>
            ACP Theater
          </Typography>
          <div className={classes.grow} />
          <div>
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
            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
      {navMenu}
      {userMenu}
    </div>
  );
}

export default NavbarUser;