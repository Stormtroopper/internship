import { actions } from "./App"
export default function Digits({dispatch,digit})
{
    return(
         <button onClick={()=>dispatch({type:actions.adding,payload:{digit}})}>{digit}</button>
    )
}
