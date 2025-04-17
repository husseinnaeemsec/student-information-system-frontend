import { FormEvent, useState } from "react";
import { guestRequest } from "../../api/requests";
import endpoints from "../../api/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, setTokens, setUser } from "../../store/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { getMediaFile } from "../../api/utils";
import { formatDateTime } from "../../utils";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('hussein');
    const [password, setPassword] = useState('2252Rexx');
    const { user } = useAppSelector((state) => state.user);
    const [loadded, setLoadingState] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();


    const logoutUser = (e:React.MouseEvent<HTMLButtonElement>): void =>{
        e.preventDefault();
        dispatch(logout());
        setError(null)
    }

    const loginUser = (e: FormEvent<HTMLElement>): void => {
        e.preventDefault();
        // Strating the request 
        setLoadingState(false);
        const data = {
            username,
            password,
        };

        const request = guestRequest.post(endpoints.user.login, data)
        request.then((response) => {
            const user = response.data.user;
            const tokens = {
                "access_token": response.data.access_token,
                "refresh_token": response.data.refresh_token
            };

            dispatch(setTokens(tokens));
            dispatch(setUser(user));
        })
            .catch((error) => {
                // console.log(error)
                if (error.status === 400) {
                    setError(error.response.data.error);
                    //
                } else if (error.status === 401) {
                    setError(error.response.data.error);
                } else if (error.code === "ERR_NETWORK") {
                    setError("The server is down please try again leater");
                } else if (error.response?.status === 404) {
                    setError("Requested resource not found.");
                } else if (error.response?.status === 422) {
                    const errors = error.response.data?.detail || "Validation failed.";
                    setError(typeof errors === "string" ? errors : "Please check your input.");
                } else if (error.response?.status === 500) {
                    setError("Something went wrong on our end. Please try again later.");
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            })
            .finally(() => {
                setLoadingState(true);
            })
    }




    return (
        <div className="h-screen fixed inset-0 w-full flex items-center justify-center z-10">
            <form onSubmit={loginUser} className="bg-white max-w-xl p-5 rounded  w-full border border-purple-400">
                {user ?

                    <div className="">
                        <div className="mb-10 space-y-2">
                        <h1 className="text-center text-2xl  capitalize"> You're Already Logged in as  <strong className="font-semibold"> {user.first_name} </strong> </h1>
                        </div>
                        <div className="flex items-center  justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={getMediaFile(user.profile?.avatar || '')}
                                    alt={`${user.first_name} ${user.last_name}`}
                                    className="w-10 h-10 rounded-full object-cover border"
                                />
                                <div>
                                    <p className="font-semibold">{user.first_name} {user.last_name}</p>
                                    <small className="text-slate-500"> {user.email} </small>
                                </div>
                            </div>

                            <button onClick={logoutUser} type="button" className="bg-purple-50 rounded border border-purple-700 p-3 px-5 text-purple-700"> <FontAwesomeIcon className='mx-2' icon={faRightFromBracket} />  Logout </button>
                        </div>
                        <p className="text-slate-500 my-3"> Last login : { formatDateTime( user.last_login  ) } </p>
                    </div>

                    :

                    <>
                        <h1 className="w-full text-center font-semibold text-2xl"> Welcome Again , Login To Your Account </h1>
                        <div className="my-10 space-y-3">
                            <div className="min-h-12 text-rose-500"> {error &&
                                <p className="flex rounded border  p-3 border-rose-700 bg-rose-50 text-rose-600 gap-3 justify-center flex-col text-center">
                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                    {error}
                                </p>
                            } </div>
                            <input required onChange={(e) => { setUsername(e.target.value) }} value={username} type="text" placeholder="Username" name="username" className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white" />
                            <input required  onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" name="password" placeholder="Password" className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white" />
                            <Link  to='/reset-password/' className="text-sm block underline" > Forgot password? </Link>
                            <button  disabled={!loadded} className={`w-full ${!loadded ? 'bg-slate-600' : 'bg-purple-600 hover:bg-purple-700'}  rounded p-3 px-5 text-white`}> {loadded ? 'Login' : 'Please Wait...'} </button>
                            <Link  to='/' className="text-sm block text-center" > Don't have an account ? <span className="underline"> create new account  </span> </Link>

                        </div>

                    </>

                }

            </form>
        </div>
    )

}


export default Login;