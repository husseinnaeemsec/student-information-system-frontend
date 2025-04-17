import { FormEvent, useState } from "react";
import { guestRequest } from "../../api/requests";
import endpoints from "../../api/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type ErrorMessages = {
    [key: string]: string[]  ; // Each field can have an array of strings as error messages
};


const Register = () => {
    const [username, setUsername] = useState('hussein_sms');
    const [email, setEmail] = useState('husseinnaeemsec+sms@gmail.com');
    const [password, setPassword] = useState('2252_TestPassword');
    const [confirmPassword,setConfirmPassword] = useState('2252_TestPassword');
    const [firstName, setFirstName] = useState('Hussein');
    const [lastName, setLastName] = useState('Naeem');
    const [error, setError] = useState<ErrorMessages>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = (e:FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            username,
            email,
            password,
            confirm_password:confirmPassword,
            first_name: firstName,
            last_name: lastName
        };

        guestRequest.post(endpoints.user.register, data)
            .then((response) => {
                navigate("/registration-pending?first_name="+response.data.first_name + '&username='+response.data.username)
                
            })  
            .catch((error) => {
                // Handle error based on status codes and capture field-specific errors
                if (error.response?.data) {
                    setError(error.response.data); // Store errors by field name
                } else {
                    setError({ general: ["An unexpected error occurred."] });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const renderFieldErrors = (field: string) => {
        return error[field] && error[field].map((msg: string, index: number) => (
            <p key={index} className="text-red-600 text-sm p-3 bg-rose-50 my-2">
                <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1" />
                {msg}
            </p>
        ));
    };

    return (
        <div className="h-screen fixed inset-0 w-full flex items-center justify-center z-10">
            <form className="bg-white max-w-xl p-5 rounded w-full border border-purple-400">
                <h1 className="w-full text-center font-semibold text-2xl">Register a New Account</h1>
                <div className="my-10 space-y-3">

                    <div className="space-y-1">
                        {renderFieldErrors("username")}
                        <input
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            type="text"
                            placeholder="Username"
                            name="username"
                            className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                        />
                    </div>

                    <div className="space-y-1">
                        {renderFieldErrors("email")}
                        <input
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                        />
                    </div>

                    <div className="space-y-1">
                        {renderFieldErrors("first_name")}
                        <input
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                        />
                    </div>

                    <div className="space-y-1">
                        {renderFieldErrors("last_name")}
                        <input
                            required
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                        />
                    </div>

                    <div className="space-y-1">
                        {renderFieldErrors("password") || renderFieldErrors("confirm_password") }
                        <input
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                        />
                        <input
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                        />
                    </div>

                    <button
                        disabled={loading}
                        onClick={registerUser}
                        className={`w-full ${loading ? 'bg-slate-600' : 'bg-purple-600 hover:bg-purple-700'} rounded p-3 px-5 text-white`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
};


export default Register;
