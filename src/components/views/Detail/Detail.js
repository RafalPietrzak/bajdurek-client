import React from 'react';
import { Grid } from '@material-ui/core';
import Progress from '../../common/Progress/Progress';
import {Alert} from '@material-ui/lab';
import StroyDetailBox from '../../features/StoryDetailBox/StroyDetailBox';

class Detail extends React.Component {
  componentDidMount() {
    const {detail, fetchDetail} = this.props;
    if (typeof detail === 'undefined') {
      fetchDetail();
    }
  }
  componentWillUnmount(){
    this.props.fetchReset();
  }
  render() {
    const {
      loadingDetail, detail } = this.props;
    if (
      (loadingDetail.active)
      || typeof detail === 'undefined'
    ) {
      return (
        <Progress />
      );
    } else if (loadingDetail.error) {
      return (
        <Alert severity="error">Error!</Alert>
      );
    } else {
      return (
        <>
          <Grid item xs={1} lg={2}></Grid>
          <Grid container spacing={4} item xs={10} lg={8}> 
            <StroyDetailBox {...detail}/>
          </Grid>
          <Grid item xs={1} lg={2}></Grid>
        </>
      )
    }
  }
}

export default Detail;