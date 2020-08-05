import React from 'react';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemIcon, ListItemText, IconButton, ListItemSecondaryAction,
  Grid, Divider, Typography, ListItemAvatar, Avatar, Button, InputLabel, FormHelperText,
  FormControl, Select, NativeSelect
} from '@material-ui/core';
import { Delete, AddBox, IndeterminateCheckBox } from '@material-ui/icons';
import useStyles from './Summary.css';
import countryList from 'country-list';
import { currencySelected } from '../../../utils/currency';
const Summary = ({
  storyDetail, checkIsLogged, setConfig, config
}) => {
  const { amount, countryCode } = config.paymentMethodsConfiguration.card;
  const summaryPrice = (currencyCode) => {
    const { decimal, exchangeRate } = currencySelected.find(cur => cur.code === currencyCode);
    const priceInUSD = storyDetail.reduce(
      (total, current) => total + current.price * current.count, 0
    ).toFixed(2);
    return {
      toDisplay: (priceInUSD * exchangeRate).toFixed(decimal) + currencyCode,
      toState: Math.round(((priceInUSD * exchangeRate).toFixed(decimal)) * Math.pow(10, decimal)),
    }
  }
  React.useEffect(() => {
    return () => {
      setConfig({
        paymentMethodsConfiguration: {
          ideal: {
            showImage: true
          },
          card: {
            hasHolderName: true,
            holderNameRequired: true,
            name: 'Credit or debit card',
            countryCode: 'US',
            amount: {
              value: 0,
              currency: 'USD',
            }
          }
        }
      });
    }
  }, []);
  const handleChange = (event) => {
    setConfig({
      paymentMethodsConfiguration: {
        ideal: {
          showImage: true
        },
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          name: 'Credit or debit card',
          countryCode: event && event.target.id === 'summaryCountry'
            ? event.target.value : countryCode,
          amount: {
            value: summaryPrice(
              event && event.target.id === 'summaryCurrency'
                ? event.target.value : amount.currency
            ).toState,
            currency: event && event.target.id === 'summaryCurrency'
              ? event.target.value : amount.currency,
          }
        }
      }
    });
  };
  if (amount.value === 0) handleChange();
  const classes = useStyles();
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
                  {story.count}
                </ListItemText>
              </ListItem>
            )
          })}
          <Divider />
          <Typography variant="h5" align="right">TOTAL: {
            summaryPrice(amount.currency).toDisplay
          }</Typography>
        </List>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="summaryCountry">Country</InputLabel>
          <Select
            native
            value={countryCode}
            onChange={handleChange}
            label="Select country to set payment method"
            inputProps={{
              name: 'Country',
              id: 'summaryCountry',
            }}
          >
            <option aria-label="None" value="" />
            {countryList.getData().map(
              country => <option value={country.code}> {country.name} </option>
            )
            }
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="summaryCurrency">Currency</InputLabel>
          <Select
            native
            value={amount.currency}
            onChange={handleChange}
            label="Select currency to set payment method"
            inputProps={{
              name: 'Currency',
              id: 'summaryCurrency',
            }}
          >
            <option aria-label="None" value="" />
            {currencySelected.map(
              currency => <option value={currency.code}>
                {currency.code + ' - ' + currency.name}
              </option>
            )
            }
          </Select>
        </FormControl>
        {checkIsLogged || (!storyDetail.length) ? '' : <Typography variant="h6">
          Before order and pay login with google account!
        </Typography>}
        <Button
          component={Link} to="/payment" disabled={
            checkIsLogged || (!storyDetail.length) ? false : true
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

export default Summary;
