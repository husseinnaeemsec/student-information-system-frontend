import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Student } from "../../../store/admin/studentsSlice";
import { faCalendar, faEye, faLandmark, faPen, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const StudentListItem = (student:Student) =>{

    return (
        <div className="grid grid-cols-4  gap-3 p-3 bg-white hover:bg-slate-50">
            <div className="flex items-center  gap-3">
                <p> <input type="checkbox" name="" className="w-4 h-4" id="" /> </p>
                <p>   {student.first_name} {student.last_name} {student.third_name} </p>
            </div>
            <p > {student.class_room.name}   </p>
            <p className="text-slate-500 ">  {student.date_of_birth}  </p>
            <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-slate-400 hover:text-slate-600" icon={faPen} />
                <FontAwesomeIcon className="text-slate-400 hover:text-slate-600" icon={faEye} />
                <FontAwesomeIcon className="text-slate-400 hover:text-slate-600" icon={faTrash} />
            </div>
        </div>
    )
}

interface StudentListProps {
    students:Student[]
} 

const StudentsList = ( props : StudentListProps  )=>{
    const {students} = props;

    return (
        <div className="border rounded border-slate-300 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-4 sticky top-0 gap-3 p-3 bg-slate-100">
                <p className="flex items-center gap-3">
                <input type="checkbox" name="" className="w-4 h-4" id="" /> 
                Student's name 
                </p>
                <p> <FontAwesomeIcon  icon={faLandmark} />   Class Room  </p>
                <p> <FontAwesomeIcon icon={faCalendar} /> Date Of Birth  </p>
                <p> <FontAwesomeIcon icon={faPenToSquare} />  Action </p>

            </div>
            {
                students.map((student) =>{
                    return <StudentListItem key={student.id}  {...student} />
                })
            }
        </div>
    )
}


export default StudentsList;