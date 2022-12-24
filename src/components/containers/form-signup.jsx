import React,{useState,useEffect} from 'react'
import {Typography,TextField,Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/auth';
export const FormSignup = ({setFormData,formData,setForm}) => {
  const [objNb, setObjNb] = useState(Object.keys(formData).length)
  const dispatch=useDispatch()
  const handleChangeSignUp=(value,key)=>setFormData({...formData,...{[key]:value}})
  useEffect(() => {
    const newArray = Object.values(formData).filter(data=>data.length>0)
    setObjNb(Object.keys(newArray).length)
  }, [formData])
  const handleSignUp=async()=>{
    dispatch(signUp(formData))
  }
    const dataSignUp =[
        {
          id:'name',
          label:"Name",
          types:"text"
        },
        {
          id:'email',
          label:"Email",
          types:"email"
        },
        {
          id:'password',
          label:"Password",
          types:"password"
        },
        {
          id:'confirm_password',
          label:"Confirm Password",
          types:"password"
        },
      ]
  return (
    <>
      <form>
        <div className='mx-auto w-5/6 my-2'>
            {dataSignUp.map(data=>
            <TextField key={data.id} value={formData[data.id]} onChange={(e)=>{handleChangeSignUp(e.target.value,data.id)}} 
            label={data.label} type={data.types} className="w-full my-1"/>
            )}
        </div>
          <div className='flex justify-center'>
              <Button disabled={objNb>3?false:true} variant='contained' className='text-third bg-base my-2 rounded-2xl w-full' onClick={handleSignUp}>SignUp</Button>
          </div>
      </form>
      <Typography variant='subtitle2' className='my-2 text-sec text-center text-sm'>Already have an account?
          <Button variant='text' className='my-2 text-base text-xs' onClick={()=>{setForm('login')}}>LogIn</Button>
      </Typography>
    </>
  )
}