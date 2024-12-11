import React,{useState,useEffect} from 'react'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'
import usePennyPincherStore from '../store/PennyPincher'



const ProtectRouteUser = ({element}) => {

    const [ok, setOk] = useState(false)
    const user = usePennyPincherStore(state => state.user)
    const token = usePennyPincherStore(state => state.token)
    
    useEffect(() => {
        if(user && token) {
            //send to back
            currentUser(token).then(res => {
                setOk(true)
            }).catch(err => {
                setOk(false)
            }
            )
        }
    },[user,token])


  return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteUser