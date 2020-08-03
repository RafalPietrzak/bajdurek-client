import React from 'react';
import Progress from '../../common/Progress/Progress';
import {Alert} from '@material-ui/lab';

class Logged extends React.Component {
  componentDidMount() {
    const { fetchUserData } = this.props;
    fetchUserData();
  }
  render() {
    const {
      loadingUserData, userData } = this.props;
    if (
      (loadingUserData.active)
      || !userData
    ) {
      return (
        <Progress/>
      );
    } else if (loadingUserData.error) {
      return (
        <Alert severity="error">Error!</Alert>
      );
    } else {
      return (
        <>
          {userData.email}
        </>
      )
    }
  }
}   

export default Logged;