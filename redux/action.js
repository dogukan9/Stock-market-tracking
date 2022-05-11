export const GET_DATA="GET_DATA"
import axios from "axios"


export const fetchData=()=>{

    return async dispatch=>{

      try {
        const response=await axios.get("https://api.borsaekranim.com/prices/")
       
        dispatch({type:GET_DATA,payload:response.data})
      } catch (error) {
        
      }
    }
}