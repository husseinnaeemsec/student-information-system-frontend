import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { faUser, faChalkboardTeacher, faUsers, faSchool, faBook, faFileInvoice, faCog, faGraduationCap, IconDefinition, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";

interface SidebarLinkProps {
    icon: IconDefinition;
    link?: string;
    text: string;
    sublinks?: ReactNode;
    className?:string;

}

const SidebarLink = (props: SidebarLinkProps) => {
    const { icon, link, text, sublinks,className } = props;
    const sublinkRef = useRef(null);
    const [isSubLinksOpen, setOpenLinks] = useState(false);
    const location = useLocation();
    const [isLinkActive, setActiveLink] = useState(false);


    useEffect(() => {
        if (!link) return;

        const pathname = location.pathname;

        // Regex to match exact path ignoring trailing slashes
        const normalizedPathname = pathname.replace(/\/+$/, '');
        const normalizedLink = link.replace(/\/+$/, '');

        const isMatch = new RegExp(`^${normalizedLink}$`).test(normalizedPathname);

        setActiveLink(isMatch);
    }, [location.pathname, link]);

    const toggleSubLinks = () => {
        if (sublinkRef && sublinkRef.current) {
            if (isSubLinksOpen) {
                gsap.to(sublinkRef.current, {
                    x:'-100%',
                    height:0,
                })
                setOpenLinks(false)
            } else {
                gsap.fromTo(sublinkRef.current, {
                    x: '-100%',
                    height:0
                },{
                    x:'0',
                    height:'auto'
                })
                setOpenLinks(true)
            }
        }

    }

    return (
        <ul>
            <li onClick={toggleSubLinks}  className={`flex  items-center gap-3  justify-between pl-5  p-3 py-4  ${isLinkActive ? 'bg-white' : 'text-purple-100'}  ${className}  `}  >
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={icon} />
                    {sublinks ?
                        <button   > {text} </button>

                        :

                        <Link to={link || ''} > {text} </Link>

                    }
                </div>
                { sublinks ? <FontAwesomeIcon icon={faAngleDown} />  : '' }
            </li>
            {sublinks ?

                <ul ref={sublinkRef} className="h-0  bg-purple-800  overflow-hidden">
                    {sublinks}
                </ul>

                : ''}
        </ul>
    )

}



const adminLinks = [
    {
        text: 'Dashboard',
        icon: faSchool,
        link: '/admin/',
    },
    {
        text: 'Students',
        icon: faUser,
        sublinks: [
            <SidebarLink  key="students-all" text="All Students" link="/admin/students" icon={faUser} />,
            <SidebarLink key="students-add" text="Add Student" link="/admin/students/add" icon={faUser} />,
        ],
    },
    {
        text: 'Teachers',
        icon: faChalkboardTeacher,
        sublinks: [
            <SidebarLink key="teachers-all" text="All Teachers" link="/admin/teachers" icon={faChalkboardTeacher} />,
            <SidebarLink key="teachers-add" text="Add Teacher" link="/admin/teachers/add" icon={faChalkboardTeacher} />,
        ],
    },
    {
        text: 'Classes',
        icon: faUsers,
        sublinks: [
            <SidebarLink key="classes-all" text="All Classes" link="/admin/classes" icon={faUsers} />,
            <SidebarLink key="classes-add" text="Add Class" link="/admin/classes/add" icon={faUsers} />,
        ],
    },
    {
        text: 'Subjects',
        icon: faBook,
        sublinks: [
            <SidebarLink key="subjects-all" text="All Subjects" link="/admin/subjects" icon={faBook} />,
            <SidebarLink key="subjects-add" text="Add Subject" link="/admin/subjects/add" icon={faBook} />,
        ],
    },
    {
        text: 'Reports',
        icon: faFileInvoice,
        link: '/admin/reports',
    },
    {
        text: 'Settings',
        icon: faCog,
        link: '/admin/settings',
    },
];

const AdminSidebar = () => {

    return (
        <aside className="h-screen  absolute inset-0 w-[300px] lg:block hidden  lg:sticky top-0 bg-gradient-to-tl from-purple-600 to-purple-800">
            <h1 className="text-4xl p-5 font-bold text-center text-white ">  <FontAwesomeIcon icon={faGraduationCap} />  SIS </h1>
            <div className="mt-10 ">
                {
                    adminLinks.map((link, index) => {
                        return <SidebarLink key={index} {...link} />
                    })
                }
            </div>
        </aside>
    )
}

export default AdminSidebar;