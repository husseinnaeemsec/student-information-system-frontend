import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { guestRequest } from "../../api/requests";
import endpoints from "../../api/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const SetNewPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(false);
        setError(null);
        setSuccess(false);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(true);
            return;
        }

        const data = {
            password,
            confirm_password:confirmPassword,
        }

        guestRequest
            .post(endpoints.user.setNewPassword(token || '' ), data )
            .then(() => {
                setSuccess(true)
                const timer = setTimeout(()=>{
                    navigate("/login/")
                },3000)

                return clearTimeout(timer);
            })
            .catch((error) => {
                console.log(error.response.data)
                if (error.response?.status === 400) {
                    setError("Invalid or expired token.");
                } else {
                    setError("Something went wrong. Please try again later.");
                }
            })
            .finally(() => setLoading(true));
    };

    return (
        <div className="h-screen fixed inset-0 w-full flex items-center justify-center z-10">
            <form onSubmit={handleResetPassword} className="bg-white max-w-xl p-5 rounded w-full border border-purple-400">
                <h1 className="w-full text-center font-semibold text-2xl">Set New Password</h1>
                <div className="my-10 space-y-3">
                    <div className="min-h-12">
                        {error && (
                            <p className="flex rounded border p-3 border-rose-700 bg-rose-50 text-rose-600 gap-3 justify-center flex-col text-center">
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="flex rounded border p-3 border-green-700 bg-green-50 text-green-700 gap-3 justify-center flex-col text-center">
                                <FontAwesomeIcon icon={faPaperPlane} />
                                Password has been successfully reset. You can now <Link className="underline" to="/login">login</Link>.
                            </p>
                        )}
                    </div>

                    <input
                        required
                        type="password"
                        placeholder="New Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                    />
                    <input
                        required
                        type="password"
                        placeholder="Confirm New Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                    />

                    <button
                        disabled={!loading}
                        className={`w-full ${!loading ? 'bg-slate-600' : 'bg-purple-600 hover:bg-purple-700'} rounded p-3 px-5 text-white`}
                    >
                        {loading ? 'Reset Password' : 'Please Wait...'}
                    </button>

                    <Link to="/login" className="text-sm block text-center mt-3">
                        Back to <span className="underline">Login</span>
                    </Link>
                    <p className="text-center"> Or </p>
                    <Link to="/reset-password/" className="text-sm block text-center mt-3">
                        Get new <span className="underline">link</span>
                    </Link>

                </div>
            </form>
        </div>
    );
};

export default SetNewPassword;
