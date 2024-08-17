import { actions } from "./App"
export default function Operations({dispatch,operation})
{
    return(
         <button onClick={()=>dispatch({type:actions.choose_operation,payload:{operation}})}>{operation}</button>
    )
}
