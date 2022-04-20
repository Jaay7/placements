import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Typography, CircularProgress, IconButton, TextField, useMediaQuery, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { EditRounded } from '@mui/icons-material';

const get_student_details = gql`
query StudentDetails {
  studentDetails {
    education
    currentCgpa
    experience
    skills
  }
}
`

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 30px',
    boxShadow: '2px 2px 10px #e2e2e2',
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '2px 0px',
    alignItems: 'baseline',
    // borderBottom: '1px solid #e2e2e2',
  },
  labels: {
    paddingRight: '10px',
    width: 'max-content',
    minWidth: '150px',
    fontWeight: 500,
    marginRight: '10px',
  }
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

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: '10px',
  padding: '6px 30px',
  fontSize: 14,
  width: 'max-content',
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  borderRadius: '50px',
  color: '#f2f2f2',
  backgroundColor: '#293934',
  border: '2px solid #293934',
  textTransform: 'Capitalize',
  transition: 'all 0.3s ease-in-out',
  fontWeight: 500,
  '&:hover': {
    color: '#293934da',
    backgroundColor: 'transparent',
    border: '2px solid #293934',
  }
}));


const StudentDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, loading, error } = useQuery(get_student_details, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  const [edit, setEdit] = React.useState(false);
  const [education, setEducation] = React.useState('');
  const [currentCgpa, setCurrentCgpa] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [skills, setSkills] = React.useState('');

  return (
    <div style={{height: 'calc(100vh - 64px)', backgroundColor: '#f5f5f5'}}>
    {loading ? <StyledDiv>
      <CircularProgress color="inherit" />
    </StyledDiv> :
    error.message === 'StudentDetails matching query does not exist.' ? <StyledDiv>
      <div className={classes.form} style={{marginTop: 20}}>
      <Typography variant="h6">
        No Details Found for this Student.
      </Typography>
      <Typography variant="body1" style={{marginBottom: 10}}>
        Please add your details below to continue.
      </Typography>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Education</Typography>
          <TextField
            size='small'
            value={education}
            margin="normal"
            fullWidth
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Current CGPA</Typography>
          <TextField
            size='small'
            value={currentCgpa}
            margin="normal"
            fullWidth
            onChange={(e) => setCurrentCgpa(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Experience</Typography>
          <TextField
            size='small'
            value={experience}
            margin="normal"
            fullWidth
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Skills</Typography>
          <TextField
            size='small'
            value={skills}
            margin="normal"
            fullWidth
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <ContainedButton
          onClick={() => {
            // setEdit(false);
            // setEducation(''); 
            // setCurrentCgpa('');
            // setExperience('');
            // setSkills('');
          }}
        >
          Add Details
        </ContainedButton>
      </div>
    </StyledDiv> :
      error ? <div>Error! {error.message}</div> :
    <StyledDiv>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Student Details
      </Typography>
      <div className={classes.form}>
        <IconButton 
          size='small'
          disableRipple 
          style={{position: 'relative', right: 0}}
          onClick={() => setEdit(!edit)}
        >
          <EditRounded color="inherit" />
          <Typography>{!edit ? 'Edit details' : 'Cancel'}</Typography>
        </IconButton>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Education</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.education}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Current CGPA</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.currentCgpa}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setCurrentCgpa(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Experience</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.experience}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Skills</Typography>
          <TextField
            disabled={!edit}
            value={data.studentDetails.skills}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      </div>
    </StyledDiv>}
    </div>
  )
}

export default StudentDetails