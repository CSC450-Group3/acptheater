import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";


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

function NavbarHome() {
  const classes = navbarStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleNavMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}><Link to='/'>Home</Link ></MenuItem>
    <MenuItem onClick={handleMenuClose}>Movies</MenuItem>
    <MenuItem onClick={handleMenuClose}>Concessions</MenuItem>
    <MenuItem onClick={handleMenuClose}>Showtimes</MenuItem>
  </Menu>
  )

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
          <Typography className={classes.acptheater} variant="p" noWrap>
            ACP Theater
          </Typography>
          <div className={classes.nav} />
          <div>
              <Button color="inherit">Sign Up</Button>
              <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
      {navMenu}
    </div>
  );
}

export default NavbarHome;