import {logout_success}from "./feature/auth"


const unauthorized401Middleware =(store)=>(next)=>(action)=>{
    if(action.type.endsWith('/rejected')){
        const payload=action.payload
        if(payload && payload.code===401){
            console.log("middle ware came into action")
            // store.dispatch(logout_success())
        }
    }
    return next(action);
}
export default unauthorized401Middleware;