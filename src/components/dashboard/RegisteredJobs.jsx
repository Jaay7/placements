import React from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
import { CircularProgress, Typography, Stack, Button, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'

const get_registered_jobs = gql`
  query UserAppliedJobs {
    userAppliedJobs {
      id
      jobTitle
      companyName
      companyLogo
      jobLocation
    }
  }
`;

const remove_application = gql`
  mutation RemoveAppliedJob($aplId: ID!) {
    removeAppliedJob(aplId: $aplId) {
      response
    }
  }
`;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px'
  },
  imgLogo: {
    width: 100,
    height: 50,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  load: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '89vh'
  }
})

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px',
  width: '100%',
  minWidth: '720px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#e7ffd6',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  marginTop: '20px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 20px',
    minWidth: '100%',
  }
}));

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  width: 'max-content',
  padding: '5px 18px',
  outline: 'none',
  border: 'none',
  borderRadius: '50px',
  backgroundColor: '#b5cea5',
  textTransform: 'Capitalize',
  transition: 'all 0.3s ease-in-out',
  color: '#293934da',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#b5cea57c',
  }
}));

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 60px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));


const RegisteredJobs = () => {
  const classes = useStyles();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const { data, loading, error } = useQuery(get_registered_jobs, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  const [removeApplication] = useMutation(remove_application, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    onCompleted: (data) => {
      window.location.reload();
      setOpenSnackBar(true);
      setSnackBarMessage(data.removeAppliedJob.response);
    },
    onError: (error) => {
      setOpenSnackBar(true);
      setSnackBarMessage(error.message);
    }
  });

  return (
    loading ? <div className={classes.load}>
    <CircularProgress size={30} color="inherit" style={{alignSelf: 'center'}} /></div> :
    error ? <Typography>Oops! Something went wrong, {error.message}</Typography> :
    <StyledDiv>
      <div style={{alignSelf: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h6">Registered Jobs</Typography>
        { data.userAppliedJobs.length > 0 ? data.userAppliedJobs.map(regJob => (
          <StyledCard key={regJob.id}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <div className={classes.imgLogo}>
                <img src={regJob.companyLogo} alt={regJob.companyName} height="100%" width="100%" />
              </div>
              <Stack direction="column">
                <Typography variant="body1">{regJob.companyName}</Typography>
                <Typography variant="h6">{regJob.jobTitle}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" alignItems="center">
                <div>
                  <Typography variant="body2" component={Link} color="#293934" style={{textDecoration: 'none', fontWeight: 'bold'}} to={`/jobs/${regJob.id}`}>View Job</Typography>
                  <ContainedButton style={{ marginLeft: 10 }}
                    onClick={() => {
                      removeApplication({
                        variables: {
                          aplId: regJob.id
                        },
                      })
                    }}
                  >Remove</ContainedButton>
                </div>
              </Stack>
            </Stack>
          </StyledCard>
        )) : 
          <Typography>You haven't applied for any jobs</Typography>
        }
      </div>
      <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackBarMessage}
        />
    </StyledDiv>
  )
}

export default RegisteredJobs