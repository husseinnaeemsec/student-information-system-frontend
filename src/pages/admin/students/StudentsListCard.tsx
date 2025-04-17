import { Student } from "../../../store/admin/studentsSlice";
import maleStudent from '../../../assets/student-male.png';
import femaleStudent from '../../../assets/student-female.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faEllipsisVertical, faSchool, faUser, faVenusMars } from "@fortawesome/free-solid-svg-icons";

interface Filter{
    code:string;
    filter:string;
    value:string;
}

interface StudentCardProps {
    student: Student;
    filters?:Filter[];
}



const StudentCard = ({ student ,filters}: StudentCardProps) => {

    const hasDateOfBirthFilter = filters?.find((f) => f.code === 'date_of_birth');
    const hasClassRoomFilter = filters?.find((f) => f.code === 'class_room');

    return (
        <div className=" relative z-[1] flex flex-col sm:flex-row items-center sm:items-start border border-slate-300 rounded-lg p-5 gap-4 bg-white shadow-sm max-w-full">
            <div className="absolute right-4 top-4">
                <button className="w-8 h-8 bg-slate-100 rounded"> <FontAwesomeIcon icon={faEllipsisVertical} /> </button>
            </div>
            <img
                src={student.gender === "male" ? maleStudent : femaleStudent}
                alt="Student"
                className="w-36 h-36 object-cover rounded bg-purple-100"
            />

            <div className="flex flex-col gap-3  text-sm w-full">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="text-slate-500 w-4" />
                    <span className="font-semibold text-slate-700">Name:</span>
                    <span className="text-slate-800">
                        {student.first_name} {student.last_name} {student.third_name}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-slate-500 w-4" />
                    <span className="font-semibold text-slate-700">Date of Birth:</span>
                    <div className="text-slate-800 relative z-[1] flex items-center">
                        {student.date_of_birth}
                        {hasDateOfBirthFilter ?
                        <span className="w-fit  px-1.5 h-5 z-[-1] bg-yellow-200 absolute">
                            <small className="opacity-0"> {hasDateOfBirthFilter?.value} </small>
                        </span> 
                        : '' }
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSchool} className="text-slate-500 w-4" />
                    <span className="font-semibold text-slate-700">Class Room:</span>
                    <div className="text-slate-800 relative z-[1] flex items-center">
                        {student.class_room.name}
                        {hasClassRoomFilter ?
                        <span className="w-fit  px-1.5 h-5 z-[-1] bg-yellow-200 absolute">
                            <small className="opacity-0"> {hasClassRoomFilter?.value} </small>
                        </span> 
                        : '' }
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faVenusMars} className="text-slate-500 w-4" />
                    <span className="font-semibold text-slate-700">Gender:</span>
                    <span className="text-slate-800 capitalize">{student.gender}</span>
                </div>
            </div>
        </div>
    );
};



const StudentsListCard = (props: { students: Student[] , filters?:Filter[] }) => {
    const { students ,filters} = props;

    return (
        <div className="grid lg:grid-cols-3 bg-white md:grid-cols-2 p-5 grid-cols-1 gap-5">
            {
                students.map((student) => {
                    return <StudentCard filters={filters} key={student.id} student={student} />
                })
            }
        </div>
    )
}

export default StudentsListCard;