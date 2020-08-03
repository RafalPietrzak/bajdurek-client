import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardHeader: {
    position: 'absolute',
    bottom: '52px',
    width: '100%',
    left: 0,
    backgroundColor: "rgba(10,10,10, 0.7)",
    padding: '0 10px',
    color: '#ffffff'
  },
  cardPrice: {
    padding: '0 10px',
    color: '#ffffff',
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'red'
  },
  card: {
    position:'relative',
  },
  placeholder: {
    flexGrow: 1,
  }
}));

export default useStyles;
