import { Box, Button, Typography } from '@mui/material'
import CostomizedInput from '../components/shared/CostomizedInput'
import { MdLogin } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
function Login() {
  const auth=useAuth()
  const handelSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget)
    const email=formData.get("email") as string
    const password=formData.get("password") as string
    try{
      toast.loading("Signing in",{id:"login"})
      await auth?.login(email, password)
      toast.success("Signed in Successfully",{id:"login"})
    }catch(error){
      console.log(error);
      toast.error("Signing in Failed",{id:"login"})
    }
  }
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={"1"}>
      <Box padding={8} mt={8} display={{md:"flex",sm:"none",xs:"none"}}>
        <img src="airobot.png" alt="Robot" style={{width:"300px"}} />
      </Box>
      <Box display={"flex"} flex={{xs:1,md:0.5}} 
      justifyContent={"center"} alignItems={'center'} 
      padding={2} ml={"auto"} mt={16}>
        <form 
        onSubmit={handelSubmit}
        style={{margin:"auto", 
        padding:"30px",
        boxShadow:"10px 10px 20px #000" ,
        border:"none",
        borderRadius:"10px"}}>
          <Box sx={{display:"flex",
        flexDirection:"column",
        justifyContent:"center"}}>
          <Typography variant='h4' textAlign={"center"} padding={2} fontWeight={600}>Login</Typography>
          <CostomizedInput type="email" name='email' label='Email'/>
          <CostomizedInput type='password' name='password' label="Password"/>
          <Button 
          type='submit'
          sx={{px:2,py:1,mt:2,
          width:"300px",borderRadius:2,
          bgcolor:"#00fffc",
          ":hover":{
            bgcolor:"white",
            color:"black"
          }
        }}
        endIcon={<MdLogin></MdLogin>}
          >LOGIN</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login