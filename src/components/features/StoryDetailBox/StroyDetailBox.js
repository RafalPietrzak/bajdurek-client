import React from 'react';
import {
  Grid, Card, CardMedia, CardContent, Typography, List, ListItem, ListItemText,
  ListItemIcon, Button, GridList, GridListTile
} from '@material-ui/core';
import useStyles from './StroyDetailBox.css';
import { Warning } from '@material-ui/icons';
const StoryDetailBox = ({
  titleImage, title, description, requirements, price, frames
}) => {
  const classes = useStyles();
  return (
    <Card elevation={5}>
      <CardMedia
        component="img" image={titleImage} className={classes.image} 
        alt={'image of ' + title}
      />
      <Grid container>
        <Grid item sx={12} md={8}>
          <CardContent>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1" className={classes.description}>{description}</Typography>
            <Typography variant="h6">Sample frames:</Typography>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {frames.map((frame, index) => (
                <GridListTile key={index} cols={1}>
                  <img src={frame} alt={'Sample frame of ' + {title}}/>
                </GridListTile>
              ))}
            </GridList>
          </CardContent>
        </Grid>
        <Grid item sx={12} md={4}>
          <CardContent>
            <Typography variant="h3">{'$' + price}</Typography>
            <Typography variant="body2">price</Typography>
            <Button
              color="primary" fullWidth={true} size="large" variant="contained"
              className={classes.buy}
            >Buy</Button>
            <Card className={classes.requirements}>
              <CardContent>
                <Typography variant="h6">Requirements</Typography>
                <List>
                  {requirements.map((req, index) => <ListItem key={index}>
                    <ListItemIcon><Warning /></ListItemIcon>
                    <ListItemText>{req}</ListItemText>
                  </ListItem>)
                  }
                </List>
              </CardContent>
            </Card>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default StoryDetailBox;