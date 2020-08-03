import React from 'react';
import { Grid, Typography } from '@material-ui/core';


const NoPermission = () => {
  return (
    <>
      <Grid item xs={1} lg={2}></Grid>
      <Grid container item xs={10} lg={8} alignItems="center"
        alignContent="center"
      ><Grid item={true}>
          <Typography variant="h4" display="block"> No permission </Typography>
        </Grid>
      </Grid>
      <Grid item xs={1} lg={2}></Grid>
    </>
  )
}
export default NoPermission;