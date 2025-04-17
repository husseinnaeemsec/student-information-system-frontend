export interface Profile{
    avatar:string;
    bio:string;
}
// The user object that will be returned from an API call (login,update profile,register,etc)
export interface ResponseUser{
    first_name:string;
    last_name:string;
    username:string;
    email:string;
    role:string;
    profile:Profile;
    last_login:string;
}