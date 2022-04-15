import React from 'react'
import { TextField, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate, Link, Navigate } from "react-router-dom"
import { styled } from '@mui/material/styles';

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
  padding: '10px 30px',
  fontSize: 14,
  height: 'max-content',
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: 'none',
  borderRadius: '50px',
  backgroundColor: '#293934',
  textTransform: 'Capitalize',
  color: '#f2f2f2',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#293934da',
  }
}));

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  if(localStorage.getItem('token')) {
    return <Navigate to="/home" />
  }

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <Typography variant="h6">Signup</Typography>
        <StyledTextField 
          label="Email" 
          margin="normal" 
          size='small'
        />
        <StyledTextField 
          label="Password" 
          margin="normal" 
          size='small'
        />
        <ContainedButton
          onClick={() => navigate('/')}
        >Signup</ContainedButton>
        <Typography style={{marginTop: 10}}>Already have an account? <Link to="/login" className={classes.links}>Login</Link></Typography>
      </div>
    </div>
  )
}

export default Signup