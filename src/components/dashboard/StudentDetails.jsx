import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { Typography } from '@mui/material';

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

const StudentDetails = () => {

  const { data, loading, error } = useQuery(get_student_details, {
    context: {
      headers: {
        authorization: 'JWT ' + localStorage.getItem('token')
      }
    },
    pollInterval: 500
  });

  return (
    loading ? <div>Loading...</div> :
    error ? <div>Error! {error.message}</div> :
    <div>
      <Typography>{data.studentDetails.education}</Typography>
      <Typography>{data.studentDetails.currentCgpa}</Typography>
      <Typography>{data.studentDetails.experience}</Typography>
      <Typography>{data.studentDetails.skills}</Typography>
    </div>
  )
}

export default StudentDetails