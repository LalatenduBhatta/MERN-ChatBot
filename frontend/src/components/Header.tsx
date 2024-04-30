import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'

function Header() {
  const auth=useAuth()
  return (
   <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
    <Toolbar sx={{display:"flex"}}>
        <Logo/>
        <div>
          {auth?.isLoggedIn ? (<>
          <NavigationLink 
            bg="#00fffc" 
            to="/chat" 
            text='GO TO CHAT'
            textColor='black'
          ></NavigationLink>
          <NavigationLink 
            bg="#51538f"
            to="/" 
            text='Logout' 
            textColor='white'
            onClick={auth.logout}
          ></NavigationLink>
          </>)
           : <>
            <NavigationLink 
            bg="#00fffc" 
            to="/login" 
            text='Login'
            textColor='black'
          ></NavigationLink>
          <NavigationLink 
            bg="#51538f"
            to="/signup" 
            text='Signup' 
            textColor='white'
          ></NavigationLink>
           </>}
        </div>
    </Toolbar>
   </AppBar>
  )
}

export default Header