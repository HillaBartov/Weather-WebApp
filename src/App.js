import './App.css';
import React, { Component }  from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme, MuiThemeProvider, ThemeProvider, withStyles} from '@material-ui/core/styles';
// import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import TextFieldMui from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import black from './media/black.jpg';
import sun from './media/sun.png';
import rain from './media/rain.jpg';
import clouds from './media/clouds.png';
import night from './media/night.jpg';
import dayImage from './media/day.jpg';
import world from './media/world.jpg';
import earth from './media/earth.png';
import extreme from './media/extreme-weather.png';
import CircularProgress from '@material-ui/core/CircularProgress';





const styles = muiTheme => ({
  label: {
    "&$focusedLabel": {
      color: "white"
    },
    "&$erroredLabel": {
      color: "orange"
    }
  },
  focusedLabel: {},
  erroredLabel: {},
  underline: {
    marginRight: "2px",
    color: 'white' ,
    "&$error:after": {
      borderBottomColor: "orange"
    },
    "&:after": {
      borderBottom: `2px solid black`
    }
  },
  error: {}
});

const TextField = withStyles(styles)(function TextField({ classes, ...props }) {
  return (
    <TextFieldMui
      label="Search city..."
      InputLabelProps={{
        classes: {
          root: classes.label,
          focused: classes.focusedLabel,
          error: classes.erroredLabel
        }
      }}
      InputProps={{
        classes: {
          root: classes.underline,
          error: classes.error
        }
      }}
      {...props}
    />
  );
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  appBar: {
    // backgroundColor: "rgba(0, 0, 0, .7)",
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    height: "70px"

  },
  card: {
    width:300,
    height: 400,
    margin: '10px',
    backgroundColor: "rgba(211, 226, 233, 0.3)",
    color: theme.palette.primary.contrastText,
    position: "relative",
    boxShadow: '2px 2px 2px 2px rgba(255, 255, 255, .1)',
  },
  media: {
    width:300,
    height: 430,
  },
  title: {
    flexGrow: 1,
  },
  theme: {
    height: "42px",
    width: "42px",
  },
  icon: {
    height: "38px",
    width: "38px",
  },
  extremeWeather: {
    height: "450",
    width: "450px",
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Prata',
      'Prata',
    ].join(','),
},});
const font = createMuiTheme({
  typography: {
    fontFamily: [
      'Lobster',
      'Lobster',
    ].join(','),
},});

const api = {
  key: "a60680c94147478b9c4f1edae42b9bdd",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const classes = useStyles();
  const [city, setCity] = React.useState('');
  const [textCity, setTextCity] = React.useState('');
  const [notFound, setNotFound] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [temp, setTemp] = React.useState('');
  const [minTemp, setMinTemp] = React.useState('');
  const [maxTemp, setMaxTemp] = React.useState('');
  const [state, setState] = React.useState('');
  const [humidity, setHumidity] = React.useState('');
  const today =  new Date();
  const day = today.getDate()
  const motheYear = '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const [days, setDays] = React.useState([day + motheYear,(day+1) + motheYear,(day+2) + motheYear ]);
  const time =  today.getHours();
  
  const handleSearch = () => {
    setTextCity(city);
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
    .then(res => res.json())
    .then( result =>{ 
      console.log(result);
      setTemp(Math.round(result.main['temp']));
      setMinTemp(Math.round(result.main['temp_min']));
      setMaxTemp(Math.round(result.main['temp_max']));
      setHumidity(result.main['humidity']);
      setState(result.weather[0]['main']);
      setCity(result.name);
      setCountry(result['sys']['country']);
      setNotFound("");
      //save the last city search, so when search is for unexisting city in the api show the last search
      localStorage.setItem('city', JSON.stringify(city));
    }).catch(error => {
      setNotFound(city + ": City not found")
      // show result for last city serch
      if(country != ""){
        const data = localStorage.getItem('city');
        if(data) {
          // setCity(JSON.parse(data));
          setTextCity(JSON.parse(data))
        }  
      }
    });
  };

  const display3Days = () => {
    var allDays = days.map((day) => { 
      return <Grid>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={state !== "Rain" ? (time > 19 || time < 6  ? night : dayImage) : rain}
          title="Paella dish"
        >
        <CardContent>
          <div className="date">
            {day}
          </div>
          <br></br>
          <div className="state">
          &nbsp;{(minTemp+maxTemp)/2 > 23 ? (<img class={classes.theme} src={sun}></img>) : (<img class={classes.theme} src={clouds}></img>)}{state}
          </div>
          <div className="weather-box">
            <div  className="temp"> 
              <div className="num">
                {temp}°c
              </div>
              minimum temp: 
              <div className="minmax">
                {minTemp}°c
              </div>
              maximum temp:
              <div className="minmax">
              {maxTemp}°c
              </div>
              <div className="humidity">
                Humidity: {humidity}%
              </div>
            </div>
          </div>
        </CardContent>
        </CardMedia>
      </Card>

    </Grid>})
    return allDays;
  }

  return (
    <div style={{width: "100%", height: "100%", overflowX:"hidden", background:`url(${black})` , backgroundRepeat: "no-repeat", backgroundSize: 'cover',}}>
      <Grid>
        <div>
          <AppBar color="transparent" position="static" className={classes.appBar}>
            <Toolbar>
              {/* <ThemeProvider theme={font}> */}
                <Typography style={{display: 'inline-block', color:"white"}} variant="h4">
                <Tooltip title="Home"><Button color="inherit" onClick={() => { localStorage.removeItem('city'); window.location.reload(true); }}><img class={classes.icon} src={earth}></img></Button></Tooltip>
                  Weather-app
                </Typography>
              
              <div className="new-city" >
                <FormControl className={clsx(classes.margin), "new-city"} variant="filled">
                  <div className="new-city-input">
                    <TextField
                      id="city"
                      type='text'
                      value={city}
                      onChange={(event) => {setCity(event.target.value);}}
                    />
                    <IconButton
                      style={{marginTop: "12px"}}
                      aria-label="search"
                      onClick={handleSearch}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <SearchIcon fontSize="medium" />
                    </IconButton>
                  </div>
                </FormControl>
              </div>
            </Toolbar>
          </AppBar>

        </div>
        <br/>
        <div className="date">
          {notFound !== "" && <div>{notFound}</div>}
          {country !== '' && 
          <ThemeProvider theme={theme}>
            <Typography style={{display: 'inline-block'}} variant="h4" className={classes.title}>
             {textCity}, {country}
            </Typography>
          </ThemeProvider>}
        </div>
        <br/>
        <Grid item xs={12}>
          {/* check is search has made, show weather/icon acordinly */}
          {country !== '' ?
          (<Grid container justifyContent="center" spacing={1}>
            {display3Days()}
          </Grid>) : (<Grid align="center"><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CircularProgress style={{marginLeft:"20px",marginRight:"20px",width: "400px", height: "400px",color:"transparent", background:`url(${extreme})` ,backgroundRepeat: "no-repeat",backgroundSize: 'cover',}}/>
            &nbsp;&nbsp;&nbsp;<br/><br/>
            &nbsp;&nbsp;&nbsp;<br/><br/>
          </Grid>)}
        </Grid>
        <Toolbar/>
      </Grid>
    </div>
  );
}

export default App;
