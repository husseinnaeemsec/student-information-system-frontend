import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const RegistrationPending = () => {
    const location = useLocation();

    // Function to get query parameters from the URL
    const getQueryParam = (param:string) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(param);
    };

    const firstName = getQueryParam("first_name");

    return (
        <div className="h-screen fixed inset-0 w-full flex items-center justify-center z-10 bg-white">
            <div className="max-w-xl p-8 rounded border border-purple-400 shadow-lg text-center">
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 text-4xl mb-4" />
                <h1 className="text-2xl font-semibold mb-2">Request Received</h1>
                <p className="text-gray-700 mb-6">
                    {firstName ? <span> Hey, <strong> {firstName} </strong> </span> : ''} Your registration request has been received. Please wait for the admin to approve your account
                    you'll receive an email for the registration confirmation in about 1 minute please let us know if you need any help
                </p>
                <Link
                    to="/"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default RegistrationPending;
