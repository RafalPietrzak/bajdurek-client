import React from 'react';
import {CircularProgress, Grid} from '@material-ui/core';
import useStyles from './Progress.css';
const Progress = () => {
  const classes = useStyles();
  return (
    <Grid 
      container 
      direction="row" 
      justify="center" 
      alignItems="center" 
      sx={12}
      className={classes.fullScreen}
    >
              <CircularProgress/>
    </Grid> 
  );
}

export default Progress;