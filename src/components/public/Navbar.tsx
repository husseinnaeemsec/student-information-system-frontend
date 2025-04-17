import { useAppSelector } from '../../store/hooks';
import './Navbar.css';
import { getMediaFile } from '../../api/utils';

export default function Navbar() {

    const {user} = useAppSelector((state)=> state.user )


    return (
        <nav className="bg-purple-600 public-navbar flex items-center w text-white p-4 ">
            <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
                { user && <img className='w-12 h-12 rounded-full border' src={getMediaFile(user?.profile?.avatar)} alt="" /> }
                <div className="font-bold text-xl">StudentMS</div>
                <ul className="flex gap-8">
                    <li>
                        <a href="#" className="hover:text-gray-300">Features</a>
                    </li>
                    <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
                    <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}
