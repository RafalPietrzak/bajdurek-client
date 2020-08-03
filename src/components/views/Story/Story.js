import React from 'react';
import StoryBox from '../../features/StoryBox/StoryBox'
import {Grid} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import Progress from '../../common/Progress/Progress'

class Story extends React.Component {
  componentDidMount() {
    const { fetchStory} = this.props;
    fetchStory();
  }
  render() {
    const {
      loadingStory, story, addToCart, fetchDetailIfNot
    } = this.props;
    if (
      (loadingStory.active)
      || !story.length
    ) {
      return (
        <Progress/>
      );
    } else if (loadingStory.error) {
      return (
        <Alert severity="error">Error!</Alert>
      );
    } else {
      return (
        <>
        <Grid item xs={1}  lg={2}></Grid>
        <Grid container spacing={4} item xs={10} lg={8}> {
          story.map(sto => {
            return (
             <StoryBox
               key={sto._id}
               detailLink={'/detail/' + sto._id}
               price={sto.price} 
               title={sto.title}
               titleImage={sto.titleImage}
               addToCart={() => {
                 fetchDetailIfNot(sto._id);
                 addToCart({_id: sto._id, count: 1})}
               }
            ></StoryBox>
            );
          })
        }
        </Grid>
        <Grid item xs={1}  lg={2}></Grid>
        </>
      )
    }
  }
}

export default Story;