import React from 'react';
import {Link} from 'react-router-dom';
import {
  List, ListItem, ListItemIcon, ListItemText, IconButton, ListItemSecondaryAction,
  Grid, Divider, Typography, ListItemAvatar, Avatar, Button
} from '@material-ui/core';
import { Delete, AddBox, IndeterminateCheckBox } from '@material-ui/icons';
import useStyles from './Cart.css';

const Cart = ({
  storyDetail, addToCart, removeFromCart, checkIsLogged
}) => {
  const classes = useStyles();
  console.log('storyDetail', storyDetail);
  return (
    <>
    <Grid item sx="false" sm={1} md={2} lg={3}></Grid>
    <Grid item sx={12} sm={10} md={8} lg={6} className={classes.root}>
      <List>
        {!storyDetail.length
          ? <Typography variant="h4" align="center">
            The cart is empty!
            </Typography>
          : ""}
        {storyDetail.map(story => {
          return (
            <ListItem key={story._id}>
              <ListItemAvatar>
                <Avatar src={story.titleImage} alt={story.title} />
              </ListItemAvatar>
              <ListItemText>
                <Typography noWrap={true} variant="body1">{story.title}</Typography>
              </ListItemText>
              <ListItemText>
                <Typography noWrap={true} variant="h6">{
                  story.price ? story.price + '$' : 'FREE'
                }</Typography>
              </ListItemText>
              <ListItemText>
                  <IconButton aria-label="add one" onClick={
                    ()=>{addToCart({_id: story._id, count: 1})}
                  }>
                    <AddBox />
                  </IconButton>
                {story.count}
                  <IconButton aria-label="remove one" onClick={
                    ()=>{addToCart({_id: story._id, count: -1})}
                  }
                  disabled={story.count <= 1 ? true : false}
                  >
                    <IndeterminateCheckBox />
                  </IconButton>
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={
                  ()=>removeFromCart(story._id)
                  }>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
        <Divider />
        <Typography variant="h5" align="right">TOTAL: {
          storyDetail.reduce(
            (total, current) => total + current.price * current.count, 0
          ).toFixed(2)
        } $</Typography>
      </List>
      {checkIsLogged || (!storyDetail.length)? '' : <Typography variant="h6">
        Before order and pay login with google account!
        </Typography>}
      <Button 
        component={Link} to="/summary" disabled={
          checkIsLogged || (!storyDetail.length)? false : true
        } variant="contained" 
        size="large" fullWidth={true} 
      >
        ORDER AND PAY
      </Button>
    </Grid>
    <Grid item sx="false" sm={1} md={2} lg={3}></Grid>
    </>
  );
}

export default Cart;