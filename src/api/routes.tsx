export const BASE_URL = 'http://localhost:8000'
export const API_URL = `${BASE_URL}/api`

const userEndpoint = (view:string)=>{
    return `${API_URL}/users/${view}/`
}

const endpoints = {

    user:{
        login:userEndpoint("login"),
        logout:userEndpoint('logout'),
        register:userEndpoint("register"),
        refreshToken:userEndpoint('refresh'),
        resetPassword:userEndpoint("reset-password"),
        setNewPassword:(token:string)=>{ return userEndpoint("reset-password") +token+"/"  },
        protectedView:userEndpoint("protected")
    }
}


export default endpoints;