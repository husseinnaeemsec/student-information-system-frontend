import { Outlet } from 'react-router-dom';
import './Dashboard.css';
import AdminSidebar from './partials/Sidebar';
import Breadcrumb from '../../components/BreadCrumbs';

const Dashboard = ()=>{

    return (
        <div className='admin-dashboard grid lg:grid-cols-[280px_1fr] p-0 m-0'>
            <AdminSidebar />
            <div className="admin-dashboard-page-content bg-slate-50 p-5 lg:p-20">
                <Breadcrumb />
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard;