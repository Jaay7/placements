import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { CircularProgress, InputAdornment, TextField, Typography, Stack, Chip, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Search, PlaceRounded, BookmarkBorderRounded } from '@mui/icons-material';
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
      companyName
			companyDescription
			companyLogo
			companyWebsite
			companyEmail
			companyPhone
			companyAddress
			companyCity
			companyState
			jobTitle
			jobDescription
			jobRequirements
			jobSalary
			jobLocation
			jobType
			jobCategory
			jobMinQualifications
			jobPrefQualifications
			jobExperience
			jobEducation
			jobSkills
			jobStartDate
			jobCreatedAt
			jobUpdatedAt
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
    loading ? <StyledDiv>
      <CircularProgress color="inherit" style={{alignSelf: 'center'}} />
    </StyledDiv> :
    error ? <StyledDiv>Oops! Something went wrong.</StyledDiv> :
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
      <GetJobs />
    </StyledDiv>
  )
}

export default Home

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 30px',
  width: '100%',
  maxWidth: '720px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#eea85230',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  width: 'max-content',
  padding: '6px 20px',
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

  return (
    loading ? <CircularProgress size="small" color="inherit" style={{alignSelf: 'center'}} /> :
    error ? <Typography>Oops! Something went wrong.</Typography> :
    <div>
      {data.jobs.map(job => (
        <StyledCard key={job.id}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="column">
              <Typography variant="h6">{job.companyName}</Typography>
              <Typography variant="h5">{job.jobTitle}</Typography>
            </Stack>
            <div className={classes.imgLogo}>
              <img src={job.companyLogo} alt={job.companyName} height="100%" width="100%" />
            </div>
          </Stack>
          <Stack direction="row" alignItems="center" flexWrap={'wrap'} sx={{marginTop: 1}}>
            <PlaceRounded />
            {job.jobLocation.split('|').map((item, index) => {
              return <Chip label={item} key={index} style={{marginTop: 5, marginLeft: 5}} />
            })}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginTop: 2}}>
            <BookmarkBorderRounded style={{color: '#293934'}} />
            <ContainedButton component={Link} to={`/jobs/${job.id}`}>View Job</ContainedButton>
          </Stack>
        </StyledCard>
      ))}
    </div>
  )
}