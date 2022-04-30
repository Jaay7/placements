import React from 'react'
import Hands from '../assets/hands.png';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

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
  }
})

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  width: '300px',
  padding: '10px 20px',
  outline: 'none',
  border: '2px solid #293934',
  borderRadius: '10px',
  backgroundColor: '#293934',
  textTransform: 'Capitalize',
  color: '#f2f2f2',
  marginTop: '30px',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0px 4px 6px #00000030',
  fontWeight: 500,
  '&:hover': {
    color: '#293934da',
    backgroundColor: 'transparent',
    border: '2px solid #293934',
  }
}));

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
      {/* <div className={classes.appBar}>
        <Link className={classes.links} to="/login"><Typography variant="body2">Login</Typography></Link>
        <Link className={classes.links} to="/signup"><Typography variant="body2">Signup</Typography></Link>
        <span style={{flex: 0.1}}></span>
      </div> */}
      <StyledDiv>
        <img src={Hands} style={{height: matchesSM ? 170 : matchesMD ? 240 : 350}} alt="svkjnd" />
        <div style={{marginLeft: 20}}>
          <Typography variant={matchesSM ? "p" : matchesMD ? "h6" : "h5"}>
            Welcome to,<br/> 
            <Typography variant={matchesSM ? "h6" : matchesMD ? "h5" : "h3"} style={{fontWeight: 600}}>University</Typography>
            <Typography variant={matchesSM ? "h6" : matchesMD ? "h5" : "h3"} style={{fontWeight: 600}}>Recruitment</Typography>
            <Typography variant={matchesSM ? "h6" : matchesMD ? "h5" : "h3"} style={{fontWeight: 600}}>Protal.</Typography>
          </Typography>
          <ContainedButton
            component={Link}
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