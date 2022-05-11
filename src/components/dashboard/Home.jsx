import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { CircularProgress, InputAdornment, TextField, Typography, Stack, Chip, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Search, PlaceRounded, BookmarkBorderRounded, BookmarkRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom'

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

const get_all_jobs = gql`
  query AllJobs {
    jobs {
      id
      jobTitle
      companyName
      companyLogo
      jobLocation
    }
  }
`;

const get_saved_jobs = gql`
  query UserSavedJobs {
    userSavedJobs {
      id
      jobTitle
      companyName
      companyLogo
      jobLocation
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
  margin: 30,
  width: '100%',
  minWidth: '660px',
  '& label.Mui-focused': {
    color: '#859d76',
  },
  '& .MuiInput-underline:after': {
    borderWidth: 2,
    borderBottomColor: '#859d76',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderWidth: 2,
      borderColor: '#859d76',
    },
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  }
}));

const Home = () => {
  
  const { loading, error } = useQuery(get_user_data, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  return (
    // loading ? <StyledDiv>
    //   <CircularProgress color="inherit" style={{alignSelf: 'center'}} />
    // </StyledDiv> :
    error ? <StyledDiv>Oops! Something went wrong. {error.message}</StyledDiv> :
    <StyledDiv>
      {/* <Typography variant='h6'>Welcome, {data.me.username}!</Typography>
      <Typography color='GrayText'>Here goes the available companies which are arrived at our campus.</Typography> */}
      <div style={{alignSelf: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <Typography variant='h5'>Find your perfect role.</Typography>
        <StyledTextField 
          placeholder='Search for jobs...'
          type='search'
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
          />
        <GetJobs />
      </div>
    </StyledDiv>
  )
}

export default Home

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 30px',
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

const GetJobs = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(get_all_jobs, {
    pollInterval: 500
  });

  const { data: savedJobsData, loading: loading2, error: error2 } = useQuery(get_saved_jobs, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      },
    },
    pollInterval: 500
  })

  return (
    loading ? <CircularProgress size={30} color="inherit" style={{alignSelf: 'center'}} /> :
    error ? <Typography>Oops! Something went wrong.</Typography> :
    <div>
      {data.jobs.map(job => (
        <StyledCard key={job.id}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="column">
              <Typography variant="body1">{job.companyName}</Typography>
              <Typography variant="h6">{job.jobTitle}</Typography>
            </Stack>
            <div className={classes.imgLogo}>
              <img src={job.companyLogo} alt={job.companyName} height="100%" width="100%" />
            </div>
          </Stack>
          <Stack direction="row" alignItems="center" flexWrap={'wrap'}>
            <PlaceRounded />
            <Typography variant="body1">{job.jobLocation.split('|').length}</Typography>
            {job.jobLocation.split('|').sort().slice(0, 3).map((item, index) => {
              return <Chip label={item} key={index} style={{marginTop: 5, marginLeft: 5}} />
            })}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {
              loading2 ? <CircularProgress size="small" color="inherit" style={{alignSelf: 'center'}} /> :
              error2 ? <Typography>Failed</Typography> :
              savedJobsData.userSavedJobs.map(savedJob => savedJob.id).includes(job.id) ?
              <BookmarkRounded style={{color: '#293934'}} /> :
              <BookmarkBorderRounded style={{color: '#293934'}} />
            }
            <ContainedButton component={Link} to={`/jobs/${job.id}`}>View Job</ContainedButton>
          </Stack>
        </StyledCard>
      ))}
    </div>
  )
}