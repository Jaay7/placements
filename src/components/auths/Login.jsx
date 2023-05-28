import React from 'react'
import { TextField, Typography, Button, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate, Link, Navigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { useMutation, gql } from '@apollo/client';
import '../../App.css';

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
    color: '#6c8780',
    textDecoration: 'none',
  }
})

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#52635e',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#52635e',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
    '&.Mui-focused fieldset': {
      borderColor: '#52635e',
    },
  },
});

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: '10px',
  padding: '6px 30px',
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: '2px solid #293934',
  borderRadius: '50px',
  backgroundColor: '#293934',
  textTransform: 'Capitalize',
  color: '#f2f2f2',
  transition: 'all 0.3s ease-in-out',
  fontWeight: 500,
  '&:hover': {
    color: '#293934da',
    backgroundColor: 'transparent',
    border: '2px solid #293934',
  }
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const [ login, {data, loading, error}] = useMutation(login_user, {
    variables: {
      email,
      password
    }
  });

  if(localStorage.getItem('token')) {
    return <Navigate to="/home" />
  }

  return (
    <>
      <svg id="svg" viewBox="0 0 1440 500" style={{position: 'absolute', top: 0, zIndex: -1}} xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
        <path d="M 0,500 C 0,500 0,333 0,333 C 88.99521531100476,371.0574162679426 177.9904306220095,409.1148325358851 281,394 C 384.0095693779905,378.8851674641149 501.03349282296665,310.5980861244019 607,301 C 712.9665071770333,291.4019138755981 807.8755980861243,340.4928229665072 895,340 C 982.1244019138757,339.5071770334928 1061.4641148325359,289.43062200956933 1151,280 C 1240.5358851674641,270.56937799043067 1340.267942583732,301.78468899521533 1440,333 C 1440,333 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="#9ab7afa1" className="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 250)"></path>
      </svg>
    <div className={classes.container}>
      <div className={classes.form}>
        { error && <Typography color="red">Oops! Something went wrong.</Typography> }
        <Typography variant="h6">Login</Typography>
        <StyledTextField 
          label="Email" 
          margin="normal" 
          size='small'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField 
          label="Password" 
          margin="normal" 
          size='small'
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
              navigate('/home');
            }
          }}
        >{loading ? <CircularProgress size={28} color="inherit" /> : "Login"}</ContainedButton>
        {/* <Typography style={{marginTop: 10}}>Don't have an account? <Link to="/signup" className={classes.links}>Signup</Link></Typography> */}
      </div>
    </div>
    </>
  )
}

export default Login