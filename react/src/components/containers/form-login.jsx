import React,{useState,useEffect} from 'react'
import {Button,TextField,Typography,Divider,Chip} from '@mui/material';
import {GoogleLogin} from 'react-google-login'
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions/auth';
import { googleSignUp } from '../../api';

export const FormLogin = ({setForm,formDataLogIn,setFormDataLogIn}) => {
  const [objNb, setObjNb] = useState(Object.keys(formDataLogIn).length)
  const dispatch = useDispatch()
  const handleLogIn=async()=>{
    dispatch(signIn(formDataLogIn))
  }
  const handleChangeLogIn=(value,key)=>setFormDataLogIn({...formDataLogIn,...{[key]:value}})
  useEffect(() => {
    const newArray = Object.values(formDataLogIn).filter(data=>data.length>0)
    setObjNb(Object.keys(newArray).length)
    console.log(objNb)
  }, [formDataLogIn])
  console.log(formDataLogIn)

  const dataLogin =[
    {
      id:'email',
      label:"Email",
      types:"email",
    },
    {
      id:'password',
      label:"Password",
      types:"password",
    },
  ]
  const dataButtons2 =[
    // {
    //   id:1,
    //   title:"Forgot Password?",
    //   fnc:handleSetFormtoForgotPasword,
    //   styles:'my-3 text-base text-xs',
    //   variant:'text'
    // },
    {
      id:2,
      title:"Login",
      fnc:handleLogIn,
      styles:'text-third bg-base my-2 rounded-2xl w-full',
      variant:'contained'
    },
    
  ]
  const responseS= async (res)=>{
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({type:'AUTH',data:{result,token}})
      const gsignup=await googleSignUp(result)
      await localStorage.setItem('profile',JSON.stringify({result:gsignup.data,token}))
    } catch (error) {
    console.log(error)
    }
  }
  const responseF=()=>{
    console.log('fff')
  }
  const handleSetFormtoForgotPasword=()=>setForm('forgotPassword')
  return (
      <>
        <div className='mx-auto w-5/6 my-2'>
          {dataLogin.map(data=>
          <TextField variant='outlined' key={data.id} value={formDataLogIn[data.id]} onChange={(e)=>{handleChangeLogIn(e.target.value,data.id)}} 
          label={data.label} type={data.types} className="w-full my-1" />
          )}
        </div>
        {dataButtons2.map(data=>
          <div key={data.id} className='flex justify-center'>
            <Button disabled={objNb>1?false:true} variant={data.variant} onClick={()=>{data.fnc()}} className={data.styles}>{data.title}</Button>
          </div>
        )}
        <Divider className='my-2'>
          <Chip label="OR" />
        </Divider>
        <div className='flex justify-center '>
          <GoogleLogin
          buttonText="Login"
          clientId={process.env.REACT_APP_CLIENTID}
          onSuccess={responseS}
          onFailure={responseF}
          cookiePolicy={'single_host_origin'}/>
        </div>
        <Typography variant='subtitle2' className='my-3 text-sec text-center text-sm'>Don't have an account?
          <Button variant='text' className=' text-base text-xs' onClick={()=>{setForm('signUp')}}>Sign Up</Button>
        </Typography>
      </>
  )
}
