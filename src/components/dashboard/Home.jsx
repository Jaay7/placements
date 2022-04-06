import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { InputAdornment, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Search } from '@mui/icons-material';

const get_user_data = gql`
  query {
    me {
      id
      username
      email
      fullName
    }
  }
`;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px'
  }
})

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 60px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));

const StyledTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  marginTop: 16,
  '& label.Mui-focused': {
    color: '#eea852',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#eea852',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#eea852',
    },
  },
  [theme.breakpoints.up('sm')]: {
    width: '400px'
  }
}));

const Home = () => {
  const classes = useStyles();
  
  const { data, loading, error } = useQuery(get_user_data, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  return (
    loading ? <div>Loading...</div> :
    error ? <div>Oops! Something went wrong.</div> :
    <StyledDiv>
      <Typography variant='h6'>Welcome, {data.me.username}!</Typography>
      <Typography color='GrayText'>Here goes the available companies which are arrived at our campus.</Typography>
      <StyledTextField 
        placeholder='Search for jobs...'
        variant='standard'
        type='search'
        InputProps={{
          startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
        }}
      />
    </StyledDiv>
  )
}

export default Home