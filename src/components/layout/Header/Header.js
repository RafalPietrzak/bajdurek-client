import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem
} from '@material-ui/core';
import { ShoppingCart, AccountCircle, Movie, ListAlt } from '@material-ui/icons';
import useStyles from './Header.css';

const Header = ({
  redirectAuthGoogle, redirectAuthLogout, isLogged, countCart, countStoryShelf
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLoginWithGoogle = () => {
    redirectAuthGoogle();
    handleClose();
  }
  const handleLogout = () => {
    redirectAuthLogout();
    handleClose();
  }
  const classes = useStyles();
  const renderAccountMenu = () => {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isLogged
          ? <MenuItem onClick={handleLogout}>Logout</MenuItem>
          : <MenuItem onClick={handleLoginWithGoogle}>Login with google</MenuItem>
        }
      </Menu>
    )
  }
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            component={Link} to="/" variant="h6" noWrap className={classes.title}
          >
            BAJDUREK.PL
        </Typography>
          <IconButton component={Link} to="/story" color="inherit">
            <Movie />
          </IconButton>
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={countCart} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton component={Link} to="/story-shelf" color="inherit" 
            disabled={isLogged ? false : true }
          >
            <Badge badgeContent={countStoryShelf} color="secondary">
              <ListAlt />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleClick}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
        {renderAccountMenu()}
      </AppBar>
      <div className={classes.placeholder} />
    </>
  );
};

export default Header;
