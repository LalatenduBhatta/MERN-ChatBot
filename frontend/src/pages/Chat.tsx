import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { red } from "@mui/material/colors"
import ChatItems from "../chat/ChatItems"
import {IoMdSend} from "react-icons/io"
import { useRef, useState } from "react"
import { sendChatRequest } from "../helpers/api.communicator"

type Message={
  role:"user"|"assistant",
  content:string;
}

function Chat() {
  const auth=useAuth()
  // console.log(auth);
  const inputRef=useRef<HTMLInputElement | null>(null)
  const [chatMessages,setChatMessages]=useState <Message[]> ([]) //using the message type
  const handelSubmit=async()=>{
    // console.log(inputRef.current?.value);
    const content=inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value=""
    }    
    const newMessage:Message={role:"user",content}
    setChatMessages((prev)=>[...prev,newMessage])
    const chatData= await sendChatRequest(content)
    setChatMessages([...chatData.chats])
  }

  return (  
    <Box sx={{display:"flex",flex:1,width:"100%",height:"100%",mt:3,gap:3}}>
      {/* //aside box */}
      <Box sx={{display:{md:"flex",xs:"none",sm:"none"},flex:0.2,flexDirection:"column"}}>
        <Box sx={{display:"flex",height:"60vh",bgcolor:"rgb(17,29,39)"
        ,borderRadius:5,flexDirection:"column",mx:3}}>
          <Avatar sx={{mx:"auto",my:2,bgcolor:"white",color:"black",
        fontWeight:700}}>
          {auth?.user?.name[0]}
          {auth?.user?.name.split(" ")[1][0]}
        </Avatar>
        <Typography sx={{mx:"auto",fontFamily:"work sans",fontSize:"14px"}}>
        You are talking to a chatbot
        </Typography>
        <Typography sx={{mx:"auto",fontFamily:"work sans",my:4,p:3,fontSize:"14px"}}>
       You can ask some questions related to Knowledge,Business,Advices,Education, etc. But
       avoid sharing personal information
        </Typography>
        <Button sx={{width:"200px",my:"auto",fontWeight:"700",
        borderRadius:3,mx:"auto",bgcolor:red[300],color:"white",
        ":hover":{bgcolor:red.A400}}}>Clear Conversation</Button>
        </Box>

      </Box>
      {/* //main chat box*/}
      <Box sx={{display:"flex",flex:{md:0.8,xs:1,sm:1},flexDirection:"column",px:3}}>
      <Typography sx={{fontSize:{md:"40px",sm:"22px",xs:"18px"},color:"white",mb:2,mx:"auto"}}>
        Model-GPT 3.5 Turbo
      </Typography>
      <Box sx={{width:"100%",height:"60vh",borderRadius:3,mx:"auto",
      flexDirection:"column",overflow:"scroll",overflowX:"hidden",scrollBehavior:"smooth", overflowY:"auto"}}>
        {chatMessages.map((chat,index)=>(
            //@ts-ignore
            <ChatItems content={chat.content} role={chat.role} key={index} />
        ))}
      </Box>
    <div style={{width:"95%",
    padding:"20px",borderRadius:8,
    backgroundColor:"rgb(17,27,39)",display:"flex",margin:"auto"}}>
      {" "}
    <input type="text"  ref={inputRef}
     style={{width:"100%",
      backgroundColor:"transparent",padding:"10px",
      border:"none",
      outline:"none",
      color:'white',
      fontSize:"20px"
    }} />
    <IconButton sx={{ml:"auto",color:"white"}} onClick={handelSubmit}>
      <IoMdSend></IoMdSend>
    </IconButton>
    </div>
      </Box>
    </Box>
  )
}

export default Chat