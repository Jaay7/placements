import React from 'react'
import { useQuery, gql, useMutation} from "@apollo/client";
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Stack, Button, Chip, Divider, useMediaQuery, Snackbar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { PlaceRounded, BookmarkBorderRounded, ChevronLeft, BookmarkRounded } from '@mui/icons-material';

const get_job = gql`
  query Job($id: ID!) {
    job(id: $id) {
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

const apply_job = gql`
  mutation ApplyJob($jobId: ID!) {
    applyJob(jobId: $jobId) {
      response
    }
  }
`;

const useStyles = makeStyles({
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
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 30px',
  width: '100%',
  maxWidth: '1080px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#e7ffd6',
  backdropFilter: 'blur(5px)',
  borderRadius: '8px',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 20px'
  }
}));

const OutlinedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  width: 'max-content',
  padding: '6px 20px',
  outline: 'none',
  border: '2px solid #293934',
  borderRadius: '50px',
  backgroundColor: 'transparent',
  textTransform: 'Capitalize',
  color: '#293934',
  transition: 'all 0.3s ease-in-out',
  fontWeight: 500,
}));

const ViewJob = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  let { id } = useParams();
  const navigate = useNavigate();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const { data, loading, error } = useQuery(get_job, {
    variables: { id: id },
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

  const [applyJob] = useMutation(apply_job, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    variables: { jobId: id },
    onCompleted: () => {
      setOpenSnackBar(true);
    }
  });

  return (
    loading ? <StyledDiv>
      <CircularProgress color="inherit" style={{alignSelf: 'center'}} />
    </StyledDiv> :
    error ? <StyledDiv>Oops! Something went wrong.</StyledDiv> :
    <StyledDiv>
      <Stack direction="row" alignItems="center" onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>
        <ChevronLeft />
        <Typography variant="body1" style={{fontSize: 17}}>Back to Home</Typography>
      </Stack>
      <StyledCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="column">
              <Typography variant="h6">{data.job.companyName}</Typography>
              <Typography variant="h5">{data.job.jobTitle}</Typography>
            </Stack>
            <div className={classes.imgLogo}>
              <img src={data.job.companyLogo} alt={data.job.companyName} height="100%" width="100%" />
            </div>
          </Stack>
          <Stack direction="row" alignItems="center" flexWrap={'wrap'} sx={{marginTop: 1}}>
            <PlaceRounded />
            {data.job.jobLocation.split('|').map((item, index) => {
              return <Chip label={item} key={index} style={{marginTop: 5, marginLeft: 5}} />
            })}
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{marginTop: 2}}>
          <div style={{display: 'flex', alignItems: 'center', padding: '6px 20px', marginRight: 20, cursor: 'pointer'}}>
          {
              loading2 ? <CircularProgress size="small" color="inherit" style={{alignSelf: 'center'}} /> :
              error2 ? <Typography>Oops! Something went wrong.</Typography> :
              savedJobsData.userSavedJobs.map(savedJob => savedJob.id).includes(data.job.id) ?
              <>
                <BookmarkRounded style={{color: '#293934'}} />
                <Typography variant="body2" color="#293934" style={{fontWeight: 500}}>Saved</Typography>
              </> :
              <>
                <BookmarkBorderRounded style={{color: '#293934', marginRight: 5}} />
                <Typography variant="body2" color="#293934" style={{fontWeight: 500}}>Save</Typography>
              </>
            }
            
          </div>
          <OutlinedButton
            onClick={() => applyJob()}
          >Apply Job</OutlinedButton>
          </Stack>
          <Divider sx={{marginTop: 3, marginBottom: 2}} />
          <Stack direction={matches ? "column" : "row"} alignItems="flex-start">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1, width: matches ? '100%' :'25%'}}>Job Description</Typography>
            <div style={{width: '100%'}}>
            {data.job.jobDescription.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
            </div>
          </Stack>
          <Divider sx={{marginTop: 3, marginBottom: 2}} />
          <Stack direction={matches ? "column" : "row"} alignItems="flex-start">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1, width: matches ? '100%' :'25%'}}>Job Requirements</Typography>
            <div style={{width: '100%'}}>
            {data.job.jobRequirements.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
            </div>
          </Stack>
          <Divider sx={{marginTop: 3, marginBottom: 2}} />
          <Stack direction={matches ? "column" : "row"} alignItems="flex-start">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1, width: matches ? '100%' :'25%' }}>Job Qualifications</Typography>
            <div style={{width: '100%'}}>
            {data.job.jobPrefQualifications.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
            </div>
          </Stack>
          <Divider sx={{marginTop: 3, marginBottom: 2}} />
          <Stack direction={matches ? "column" : "row"} alignItems="flex-start">
            <Typography variant="h6" sx={{marginTop: 2, marginBottom: 1, width: matches ? '100%' :'25%' }}>Education</Typography>
            <div style={{width: '100%'}}>
            {data.job.jobEducation.split('|').map((item, index) => {
              return <Typography variant="body1" key={index}>{item}</Typography>
            })}
            </div>
          </Stack>
        </StyledCard>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Application Sent"
        />
    </StyledDiv>
  )
}

export default ViewJob