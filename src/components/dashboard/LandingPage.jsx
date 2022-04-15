import React from 'react'
import Recruit from '../assets/recruit.png';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    maxHeight: 'max-content',
    // backgroundColor: '#52635e',
    // backgroundImage: 'radial-gradient( circle farthest-corner at 50.7% 54%,  rgba(204,254,152,1) 0%, rgba(229,253,190,1) 92.4% )',
    backgroundImage: 'radial-gradient( circle 400px at 6.8% 8.3%,  rgba(255,244,169,1) 0%, rgba(255,244,234,1) 100.2% )',
    color: '#E65100',
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
    color: '#F57C00',
    textDecoration: 'none',
    border: '2px solid #F57C00',
    padding: '5px 14px',
    borderRadius: '50px',
    margin: '0 10px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#F57C00',
      color: '#fff',
    }
  }
})

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 160px',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('md')]: {
    padding: '20px 80px',
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
      <div className={classes.appBar}>
        <Link className={classes.links} to="/login"><Typography variant="body2">Login</Typography></Link>
        <Link className={classes.links} to="/signup"><Typography variant="body2">Signup</Typography></Link>
        <span style={{flex: 0.1}}></span>
      </div>
      <StyledDiv>
        <Typography variant={matchesSM ? "p" : matchesMD ? "h6" : "h5"}>
          Welcome to,<br/> 
          <Typography variant={matchesSM ? "h6" : matchesMD ? "h5" : "h4"}>University Recruitment Protal..!</Typography>
        </Typography>
        <img src={Recruit} style={{height: matchesSM ? 270 : matchesMD ? 360 : 450}} alt="svkjnd" />
      </StyledDiv>
    </div>
  )
}

export default LandingPage