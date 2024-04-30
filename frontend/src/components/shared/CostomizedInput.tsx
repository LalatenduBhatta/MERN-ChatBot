import { TextField } from "@mui/material"

type Props={
    name:string,
    type:string,
    label:string,
}
function CostomizedInput(props:Props) {
  return (
    <>
    <TextField 
    name={props.name} 
    margin="normal"
    label={props.label} 
    type={props.type}
    InputLabelProps={{style:{color:"white"}}}
    inputProps={{style:{width:"300px",borderRadius:"10px",fontSize:20,color:"white"}}}
    ></TextField>
    </>
  )
}

export default CostomizedInput