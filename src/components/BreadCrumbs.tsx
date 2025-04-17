import { Link, useLocation } from "react-router-dom";
const Breadcrumb = () => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);

    return (
        <nav className="text-sm font-medium my-4">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link to="/" className="text-purple-600 hover:underline">
                        Home
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    const path = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;

                    return (
                        <li key={path} className="flex items-center space-x-2">
                            <span className="mx-1 text-gray-400">/</span>
                            {isLast ? (
                                <span className="text-purple-900 capitalize">{decodeURIComponent(segment)}</span>
                            ) : (
                                <Link
                                    to={path}
                                    className="text-purple-700 hover:underline capitalize"
                                >
                                    {decodeURIComponent(segment)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
