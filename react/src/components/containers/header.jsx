import React, { useEffect, useState } from 'react'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateProject } from '../../actions/projects'
import { IconButton } from './units'
import {Button, Container,Grid,Menu,MenuItem,TextField,Typography} from '@mui/material';

export const Header = ({project}) => {
  const dispatch=useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = useState(false)
  const [addUser, setAddUser] = useState('')
  const [projecTtitle,setProjectTitle] = useState(project?.title)
  const selector = useSelector(state =>state.users)
  useEffect(() => {
    setProjectTitle(project?.title)
  }, [dispatch,project])
  const updateProjectTitle=(e) => {
    e.preventDefault()
    dispatch(updateProject(project?._id,{title:projecTtitle}))
    setState(false)
  }
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null)
    setAddUser('')
  }
  const handlePickUser = () =>{
    dispatch(updateProject(project?._id,{newMember:[addUser._id]}))
    handleClose()
  }
  const user = JSON.parse(localStorage.getItem('profile')).result
  const id = user.googleId ? user.googleId  :user._id
  return (
    <>
      <Container maxWidth='lg' className='my-5' >
        <Grid container justifyContent="space-around" alignItems="center">
          {!state?<Button variant="contained" className='cursor-pointer rounded-md bg-sec hover:bg-base hover:text-third my-2'  onClick={()=>{id === project.leader&&setState(true)}}>{projecTtitle}</Button>
          :<form onSubmit={updateProjectTitle}>
            <TextField className='my-2' label={projecTtitle} autoFocus type='text' variant='standard' value={projecTtitle} onChange={(e)=>{setProjectTitle(e.target.value)}}/>
            <button type='submit'></button>
            </form>}
          <Typography variant='body1' className='text-sec font-bold my-2'>{projecTtitle} Workspace</Typography>
          {id === project?.leader&&
            <div className='my-2'>
              <IconButton fnc={handleClick} title='invite' icon={faUserPlus} styles='bg-sec text-third'/>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose} id="basic-menu" MenuListProps={{'aria-labelledby': 'basic-button'}}>
                <MenuItem><TextField value={addUser.length===0?'Pick a User to Add':addUser.name} disabled/></MenuItem>
                  {
                  selector.map(user=>
                  !project.team.includes(user._id) && !project.team.includes(user.id)&&
                    <MenuItem key={user._id} divider onClick={()=>setAddUser(user)} className=' text-center rounded-md'>{user.email}</MenuItem>
                    )}
                <div className='flex justify-center mt-2'>
                  <Button disabled={addUser.length===0?true:false} variant='contained' className='bg-sec' onClick={handlePickUser}>add this user</Button>
                </div>
              </Menu>
            </div>
          }
        </Grid>
      </Container>
    </>
  )
}
