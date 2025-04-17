import { BASE_URL } from "./routes";

export const getMediaFile = (path:string)=>{
    return `${BASE_URL}${path}`
}

