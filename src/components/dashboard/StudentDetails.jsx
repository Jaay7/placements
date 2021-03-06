import React from 'react'
import { useQuery, gql, useMutation } from "@apollo/client";
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

const add_student_details = gql`
mutation AddStudentDetails($education: String!, $currentCgpa: String!, $experience: String!, $skills: String!) {
  addStudentDetails(
      education: $education,
      currentCgpa: $currentCgpa,
      experience: $experience,
      skills: $skills
  ) {
      studentId
      education
      experience
  }
}
`;

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // boxShadow: '2px 2px 10px #e2e2e2',
    borderRadius: 5,
    alignSelf: 'flex-start',
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
  display: 'flex',
  flexDirection: 'column',
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

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#52635e',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#52635e',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#52635e',
    },
  },
});

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

  const [ add_details, {data1, loading1, error1}] = useMutation(add_student_details, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    variables: {
      education: education,
      currentCgpa: currentCgpa,
      experience: experience,
      skills: skills
    },
  });

  return (
    <div style={{height: 'max-content'}}>
    {loading ? <CircularProgress size={30} color="inherit" /> :
    error && error.message === 'StudentDetails matching query does not exist.' ? <StyledDiv>
      <div className={classes.form} style={{marginTop: 20}}>
      <Typography variant="h6">
        No Details Found for this Student.
      </Typography>
      <Typography variant="body1" style={{marginBottom: 10}}>
        Please add your details below to continue.
      </Typography>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Education</Typography>
          <StyledTextField
            size='small'
            value={education}
            margin="normal"
            fullWidth
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Current CGPA</Typography>
          <StyledTextField
            size='small'
            value={currentCgpa}
            margin="normal"
            fullWidth
            onChange={(e) => setCurrentCgpa(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Experience</Typography>
          <StyledTextField
            size='small'
            value={experience}
            margin="normal"
            fullWidth
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Skills</Typography>
          <StyledTextField
            size='small'
            value={skills}
            margin="normal"
            fullWidth
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <ContainedButton
          onClick={() => {
            add_details();
            console.log(data1);
          }}
        >
          {loading1 ? <CircularProgress size={28} color="inherit" /> : "Add Details"}
        </ContainedButton>
      </div>
    </StyledDiv> :
      error ? <div>Error! {error.message}</div> :
    <StyledDiv>
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
          <StyledTextField
            disabled={!edit}
            value={data.studentDetails.education}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Current CGPA</Typography>
          <StyledTextField
            disabled={!edit}
            value={data.studentDetails.currentCgpa}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            onChange={(e) => setCurrentCgpa(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Experience</Typography>
          <StyledTextField
            disabled={!edit}
            value={data.studentDetails.experience}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className={classes.box}>
          <Typography variant="p" className={classes.labels}>Skills</Typography>
          <StyledTextField
            disabled={!edit}
            value={data.studentDetails.skills}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      </div>
    </StyledDiv>}
    </div>
  )
}

export default StudentDetails