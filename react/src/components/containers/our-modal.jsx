import React, { useState,useEffect } from 'react'
import { IconButton } from './units';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createProject } from '../../actions/projects';
import FileBase64 from 'react-file-base64';
// import {makeStyles} from "@material-ui/core/styles"
import {Box,Button,Modal,TextField,Typography }from '@mui/material';

export const OurModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setform] = useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch()
  const handleForm=(key,value)=>{
    setform({...form,...{[key]:value}})
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
  };
  const user = JSON.parse(localStorage.getItem('profile')).result
  const addProject=(e)=>{
    e.preventDefault()
    dispatch(createProject({...form,userId:user._id}))
    setOpen(false)
  }
  const fildsData =[
    {
      id:'title',
      label:'name',
    },
  ]
  return (
    <>
      <Button onClick={handleOpen} className='text-third bg-base rounded-2xl'>Create a Project</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className='border-2 border-sec rounded-3xl bg-third w-5/6 sm:w-2/3 md:w-1/2'>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center bg-base text-third rounded-3xl p-1 mb-3'>
            Add a new Project
          </Typography>
          <form onSubmit={addProject} >
            {fildsData.map(data=>
            <div key={data.id} className='flex justify-center '>
              <TextField variant='standard' label={data.label} className='my-3 w-1/2' value={form[data.id]} 
              onChange={(e)=>{handleForm(data.id,e.target.value)}} color="secondary"/>
            </div>
            )}
            <div className={`flex justify-center
             
             `}
            //  ${classes.styling}
             >
              <label  htmlFor="contained-button-file">
              <FileBase64 type='file' onDone={({base64})=>{handleForm('file64',base64)}} />
                  {/* <Typography variant='body1' className='cursor-pointer text-base border-2 border-base px-2 rounded-md font-bold block'>
                    Upload the Project Image</Typography> */}
              </label>
            </div>
            <div className='flex justify-center'>
              <IconButton disabled={!form?.title?.trim().length>0} title='add Project' type="submit" icon={faAdd} styles='text-third bg-base mt-3 rounded-2xl p-2'/>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  )
}
