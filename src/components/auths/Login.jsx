import React from 'react'
import { TextField, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate, Link, Navigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { useMutation, gql } from '@apollo/client';

const login_user = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 300
  },
  links: {
    color: '#eea852',
    textDecoration: 'none',
  }
})

const StyledTextField = styled(TextField)({
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
});

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: '10px',
  padding: '10px 30px',
  fontSize: 14,
  height: 'max-content',
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: 'none',
  backgroundColor: '#eea852',
  textTransform: 'Capitalize',
  color: '#464646',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#eea152',
  }
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [ username, setUsername ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const [ login, {data, loading, error}] = useMutation(login_user, {
    variables: {
      username,
      password
    }
  });

  if(localStorage.getItem('token')) {
    return <Navigate to="/" />
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <Typography variant="h6">Login</Typography>
        <StyledTextField 
          label="Username" 
          margin="normal" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField 
          label="Password" 
          margin="normal" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/login" className={classes.links} style={{alignSelf: 'flex-end'}}>Forgot Password?</Link>
        <ContainedButton
          onClick={() => {
            login();
            console.log(data);
            if(data) {
              localStorage.setItem('token', data.login.token);
              navigate('/');
            }
          }}
        >Login</ContainedButton>
        <Typography style={{marginTop: 10}}>Don't have an account? <Link to="/signup" className={classes.links}>Signup</Link></Typography>
      </div>
    </div>
  )
}

export default Login