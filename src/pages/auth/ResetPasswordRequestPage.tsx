import { FormEvent, useState } from "react";
import { guestRequest } from "../../api/requests";
import endpoints from "../../api/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = (e: FormEvent<HTMLElement>): void => {
        e.preventDefault();
        setLoading(false);
        setError(null);
        setSuccess(false);

        guestRequest
            .post(endpoints.user.resetPassword, { email })
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => {
                if (error.response?.status === 404) {
                    setError("Email address not found.");
                } else if (error.response?.status === 400) {
                    setError("Invalid email format.");
                } else {
                    setError("Something went wrong. Please try again later.");
                }
            })
            .finally(() => {
                setLoading(true);
            });
    };

    return (
        <div className="h-screen fixed inset-0 w-full flex items-center justify-center z-10">
            <form onSubmit={handleResetPassword} className="bg-white max-w-xl p-5 rounded w-full border border-purple-400">
                <h1 className="w-full text-center font-semibold text-2xl"> Reset Your Password </h1>
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
                                If an account with that email exists, a reset link has been sent.
                            </p>
                        )}
                    </div>
                    <input
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        className="w-full p-3 placeholder:text-slate-400 px-5 rounded border border-purple-400 bg-white"
                    />
                    <button
                        disabled={!loading}
                        className={`w-full ${!loading ? 'bg-slate-600' : 'bg-purple-600 hover:bg-purple-700'} rounded p-3 px-5 text-white`}
                    >
                        {loading ? 'Send Reset Link' : 'Please Wait...'}
                    </button>
                    <Link to="/login" className="text-sm block text-center mt-3">
                        Remember your password? <span className="underline">Login</span>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
