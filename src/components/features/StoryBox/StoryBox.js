import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Grid, Card, CardMedia, CardActions, Typography
} from '@material-ui/core';
import useStyles from './StoryBox.css';

const StoryBox = ({titleImage, title, detailLink, addToCart, price }) =>{ 
  const classes = useStyles();
  return (
  <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
    <Card className={classes.card} elevation={5}>
      <Typography variant="h6" className={classes.cardHeader} noWrap={true}>
        {title}
      </Typography>
      <Typography variant="h6" className={classes.cardPrice}>
        {price + '$'}
      </Typography>
      <CardMedia component="img" height="200" image={titleImage} />
      <CardActions>
        <div className={classes.placeholder}/>
        <Button variant="outlined" component={Link} to={detailLink}>Detail</Button >
        <Button variant="outlined" color="primary" onClick={addToCart}>
          BUY
        </Button>
        <div className={classes.placeholder}/>
      </CardActions>
    </Card>
  </Grid >
);}
export default StoryBox;
