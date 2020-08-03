import React from 'react';
import Header from '../Header/HeaderContainer';
import { Grid } from '@material-ui/core';
const MainLayout = ({ children}) => {
  return (
    <Grid container direction="column">
      <Grid item><Header 
      /></Grid>
      <Grid item container>
        {children}
      </Grid>
    </Grid>
  )
}

export default MainLayout;