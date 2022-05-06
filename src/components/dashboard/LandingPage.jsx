import React from 'react'
import Hands from '../assets/hands.png';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import ContainedButton from '../utils';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    maxHeight: 'max-content',
    // backgroundColor: '#52635e',
    backgroundImage: 'radial-gradient( circle farthest-corner at 50.7% 54%,  rgba(204,254,152,1) 0%, rgba(229,253,190,1) 92.4% )',
    // backgroundImage: 'radial-gradient( circle 400px at 6.8% 8.3%,  rgba(255,244,169,1) 0%, rgba(255,244,234,1) 100.2% )',
    color: '#293934',
    boxShadow: "inset 0px -12px 16px #00000010",
  },
  appBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '60px',
    position: 'fixed',
    width: '100%',
    top: 0,
    // borderBottom: '1px solid #fff',
  },
  links: {
    color: '#293934',
    textDecoration: 'none',
    border: '2px solid #293934',
    padding: '5px 14px',
    borderRadius: '50px',
    margin: '0 10px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#293934',
      color: '#fff',
    }
  },
  vector: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '300px',
    height: '300px',
    backgroundColor: '#859d76',
    transform: 'rotate(-90deg)',
    borderTopLeftRadius: '300px',
    boxShadow: "inset 0px 0px 12px #00000040",
    zIndex: 0,
  },
  vector2: {
    position: 'absolute',
    top: 60,
    left: 60,
    width: '100px',
    height: '100px',
    backgroundColor: '#b5cea540',
    backdropFilter: 'blur(5px)',
    transform: 'rotate(90deg)',
    borderRadius: '300px',
    border: '2px solid #29393430',
    boxShadow: "inset 0px 0px 18px #29393420",
    zIndex: 0,
  },
})


const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 160px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('md')]: {
    padding: '20px 80px',
    flexDirection: 'column',
  }
}));

const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  if(localStorage.getItem('token')) {
    return <Navigate to="/home" />
  }

  return (
    <div className={classes.container}>
      {/* <div className={classes.vector}></div> */}
      {/* <div className={classes.vector2}></div> */}
      <StyledDiv>
        <img src={Hands} style={{height: matchesSM ? 170 : matchesMD ? 240 : 350, zIndex: 1}} alt="svkjnd" />
        <div style={{marginLeft: 20}}>
          <Typography variant={matchesSM ? "p" : matchesMD ? "h6" : "h5"}>
            Welcome to,<br/> 
            <Typography variant={matchesSM ? "h6" : matchesMD ? "h5" : "h3"} style={{fontWeight: 600, textShadow: '0px 3px 4px #00000030'}}>University</Typography>
            <Typography variant={matchesSM ? "h6" : matchesMD ? "h5" : "h3"} style={{fontWeight: 600, textShadow: '0px 3px 4px #00000030'}}>Recruitment</Typography>
            <Typography variant={matchesSM ? "h6" : matchesMD ? "h5" : "h3"} style={{fontWeight: 600, textShadow: '0px 3px 4px #00000030'}}>Portal.</Typography>
          </Typography>
          <ContainedButton
            component={Link}
            style={{marginTop: 20, padding: '10px 20px'}}
            to="/login"
          >
            Get Started
            <span style={{flex: 1}}></span>
            <ArrowForward  />
          </ContainedButton>
        </div>
      </StyledDiv>
    </div>
  )
}

export default LandingPage