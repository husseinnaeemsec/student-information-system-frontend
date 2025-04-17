import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassRoom, Student } from "../../../store/admin/studentsSlice";
import { faFilter, faIdCard, faList, faSearch, faTable, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import StudentsList from "./StudentsList";
import StudentsListCard from "./StudentsListCard";

const classRooms: ClassRoom[] = [
    { id: 1, name: "Science A" },
    { id: 2, name: "Math B" },
    { id: 3, name: "Literature C" },
    { id: 4, name: "Physics D" },
    { id: 5, name: "History E" },
];

const students: Student[] = [
    { id: 1, first_name: "Ali", last_name: "Hassan", third_name: "Naeem", date_of_birth: "2008-04-12", gender: "male", class_room: classRooms[0] },
    { id: 2, first_name: "Sara", last_name: "Khalid", third_name: "Majid", date_of_birth: "2009-06-30", gender: "female", class_room: classRooms[1] },
    { id: 3, first_name: "Omar", last_name: "Fadhil", third_name: "Ali", date_of_birth: "2008-11-01", gender: "male", class_room: classRooms[2] },
    { id: 4, first_name: "Zainab", last_name: "Nasser", third_name: "Jabbar", date_of_birth: "2007-12-05", gender: "female", class_room: classRooms[3] },
    { id: 5, first_name: "Yusuf", last_name: "Mohammed", third_name: "Sami", date_of_birth: "2009-02-14", gender: "male", class_room: classRooms[4] },
    { id: 6, first_name: "Laila", last_name: "Saad", third_name: "Salim", date_of_birth: "2008-09-08", gender: "female", class_room: classRooms[0] },
    { id: 7, first_name: "Hussein", last_name: "Tariq", third_name: "Adnan", date_of_birth: "2008-01-19", gender: "male", class_room: classRooms[1] },
    { id: 8, first_name: "Fatima", last_name: "Ahmed", third_name: "Rashid", date_of_birth: "2007-10-22", gender: "female", class_room: classRooms[2] },
    { id: 9, first_name: "Rami", last_name: "Hadi", third_name: "Mahmoud", date_of_birth: "2009-05-01", gender: "male", class_room: classRooms[3] },
    { id: 10, first_name: "Noor", last_name: "Samir", third_name: "Kamal", date_of_birth: "2009-07-23", gender: "female", class_room: classRooms[4] },
    { id: 11, first_name: "Bilal", last_name: "Zaid", third_name: "Ammar", date_of_birth: "2008-03-15", gender: "male", class_room: classRooms[0] },
    { id: 12, first_name: "Hiba", last_name: "Othman", third_name: "Saleh", date_of_birth: "2009-08-11", gender: "female", class_room: classRooms[1] },
    { id: 13, first_name: "Khaled", last_name: "Majed", third_name: "Faris", date_of_birth: "2008-06-17", gender: "male", class_room: classRooms[2] },
    { id: 14, first_name: "Mona", last_name: "Abbas", third_name: "Murtadha", date_of_birth: "2007-11-09", gender: "female", class_room: classRooms[3] },
    { id: 15, first_name: "Salim", last_name: "Amer", third_name: "Qasim", date_of_birth: "2009-01-03", gender: "male", class_room: classRooms[4] },
    { id: 16, first_name: "Rasha", last_name: "Hassan", third_name: "Jassim", date_of_birth: "2008-05-29", gender: "female", class_room: classRooms[0] },
    { id: 17, first_name: "Nour", last_name: "Tamer", third_name: "Bashar", date_of_birth: "2009-10-06", gender: "female", class_room: classRooms[1] },
    { id: 18, first_name: "Tariq", last_name: "Riyad", third_name: "Waleed", date_of_birth: "2008-02-21", gender: "male", class_room: classRooms[2] },
    { id: 19, first_name: "Aya", last_name: "Ibrahim", third_name: "Laith", date_of_birth: "2007-09-27", gender: "female", class_room: classRooms[3] },
    { id: 20, first_name: "Mahdi", last_name: "Ali", third_name: "Saeed", date_of_birth: "2008-12-31", gender: "male", class_room: classRooms[4] },
    { id: 21, first_name: "Nada", last_name: "Firas", third_name: "Munir", date_of_birth: "2009-04-10", gender: "female", class_room: classRooms[0] },
    { id: 22, first_name: "Zaid", last_name: "Kareem", third_name: "Jalal", date_of_birth: "2008-07-16", gender: "male", class_room: classRooms[1] },
    { id: 23, first_name: "Dina", last_name: "Basim", third_name: "Haider", date_of_birth: "2007-08-19", gender: "female", class_room: classRooms[2] },
    { id: 24, first_name: "Hassan", last_name: "Fahad", third_name: "Kamil", date_of_birth: "2009-03-03", gender: "male", class_room: classRooms[3] },
    { id: 25, first_name: "Leen", last_name: "Anas", third_name: "Rami", date_of_birth: "2008-10-13", gender: "female", class_room: classRooms[4] },
    { id: 26, first_name: "Osama", last_name: "Najm", third_name: "Nadim", date_of_birth: "2009-11-25", gender: "male", class_room: classRooms[0] },
    { id: 27, first_name: "Reem", last_name: "Jamal", third_name: "Nasir", date_of_birth: "2007-06-07", gender: "female", class_room: classRooms[1] },
    { id: 28, first_name: "Marwan", last_name: "Qays", third_name: "Zuhair", date_of_birth: "2008-04-18", gender: "male", class_room: classRooms[2] },
    { id: 29, first_name: "Alaa", last_name: "Sultan", third_name: "Younis", date_of_birth: "2007-05-26", gender: "male", class_room: classRooms[3] },
    { id: 30, first_name: "Rami", last_name: "Essam", third_name: "Rashad", date_of_birth: "2008-09-04", gender: "male", class_room: classRooms[4] },
];


const displayTypes = [
    {
        type: "list",
        icon: faList,
    },
    {
        type: "table",
        icon: faTable,
    },
    {
        type: "card",
        icon: faIdCard
    }
]

interface FilterItem {
    filter: string;
    code: string;
    value: string;
}

const StudentsListPage = () => {

    const [displayType, setDisplayType] = useState("card")
    const [birthDateFilter, setBirthDateFilter] = useState("");
    const [studentData, setStudentData] = useState(students);
    const [isFilterMenuOpen, setFilterMenuState] = useState(false);
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [classId, setClassId] = useState(0);

    const filterData = () => {
        if (!birthDateFilter && !classId) {
            setStudentData(studentData)
            setFilterMenuState(false)
            return
        }
        
        let filtered = studentData;

        if (birthDateFilter) {
            const regex = new RegExp(`^${birthDateFilter.replace(/[-\/]/g, "-")}`);
            filtered = studentData.filter((student) => regex.test(student.date_of_birth));
            setStudentData(filtered);
            const existingDateOfBirthFilter = filters.find((filter) => filter.code === 'date_of_birth' );
            if (!existingDateOfBirthFilter) {
                setFilters((prevState) => [
                    ...prevState,
                    { code: 'date_of_birth', filter: 'Date Of Birth', value: birthDateFilter },
                ]);
            }else{
                existingDateOfBirthFilter.value = birthDateFilter
            }
        }
        if (classId !== 0) {
            const filtredByClass = filtered.filter((student) => student.class_room.id === classId)
            const existingClassRoomFilter = filters.find((filter) => filter.code === 'class_room'  )
            setStudentData(filtredByClass);
            if (!existingClassRoomFilter) {
                setFilters((prevState) => [
                    ...prevState,
                    {
                        filter: "Class Room",
                        code: "class_room",
                        value: classRooms.find((classRoom) => classRoom.id === classId)?.name || ''
                    },
                ]);
            }else{
                existingClassRoomFilter.value = classRooms.find((classRoom) => classRoom.id === classId)?.name || ''
            }
        }

        setFilterMenuState(false);

    }



    const getStudentInformation = () => {

        switch (displayType) {
            case "list":
                return <StudentsList students={studentData} />
            
            case "card":
                return <StudentsListCard filters={filters}  students={studentData}  />
        }

    }



    const removeFilter = (code: string) => {
        if (code === "date_of_birth") setBirthDateFilter("");
        if (code === "class_room") setClassId(0);

        const updatedFilters = filters.filter((f) => f.code !== code);
        setFilters(updatedFilters);

        let filtered = [...studentData];

        updatedFilters.forEach((filter) => {
            if (filter.code === "date_of_birth") {
                const regex = new RegExp(`^${filter.value}`);
                filtered = filtered.filter((student) =>
                    regex.test(student.date_of_birth)
                );
            }

            if (filter.code === "class_room") {
                filtered = filtered.filter(
                    (student) =>
                        student.class_room.name === (filter.value as string)
                );
            }
        });

        setStudentData(filtered);
    };

    return (
        <div>
            {/* Basic info header  */}
            <div className="flex justify-between">
                <div className="space-y-3">
                    <h1 className="text-2xl font-semibold"> Students List </h1>
                    <p className="text-slate-500 text-sm"> Manage and view students in your ogranization. </p>
                </div>
            </div>
            {/* End of header  */}
            {/* Search & filters & diplsay type (list,table,cards) */}
            <div className=" p-5 my-5 border rounded   bg-white  border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="relative flex items-center z-0">
                        <input type="text" placeholder="search for students" className="focus:outline focus:outline-purple-500 placeholder:text-slate-500 text-sm pl-8 lg:w-96 w-full p-2 rounded border border-purple-300 bg-white" />
                        <FontAwesomeIcon icon={faSearch} className='absolute left-2 text-slate-300 ' />
                    </div>
                    {/* Filters & Display options */}
                    <div className="flex items-center gap-3">
                        <div className=" flex items-center gap-3">
                            <div className="relative z-10">
                                {/* Filter menu */}
                                <button onClick={() => { setFilterMenuState(!isFilterMenuOpen) }} title="Filters" className="w-12 h-10 rounded border bg-slate-50 border-slate-300 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faFilter} />
                                </button>
                                {/* Filters container  */}
                                <div className={` ${isFilterMenuOpen ? 'block' : 'hidden'} absolute w-96 right-0  rounded bg-white border border-slate-300 z-10  shadow top-[120%] `}>
                                    <p className="text-slate-500 border-b p-3 border-slate-300"> Filters </p>
                                    {/* Filter items */}
                                    <div className="p-5 space-y-3 text-sm">
                                        {/* Item */}
                                        <div className="grid grid-cols-2 gap-5">
                                            <span className="text-slate-500"> By Birth Date </span>
                                            <input value={birthDateFilter} onChange={(e) => { setBirthDateFilter(e.target.value) }} type="text" placeholder="YYYY-MM-DD" className="text-sm placeholder:text-slate-400 p-2 rounded  bg-slate-100" />
                                        </div>
                                        {/* Item */}
                                        <div className="grid grid-cols-2 gap-5">
                                            <span className="text-slate-500"> By Class </span>
                                            <select value={classId} onChange={(e) => { setClassId(parseInt(e.target.value)) }} name="class_room" id="" className="p-2 rounded  bg-slate-100 focus:text-purple-900 text-slate-400 ">
                                                {
                                                    classRooms.map((classRoom) => {
                                                        return <option value={classRoom.id}> {classRoom.name} </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <button onClick={filterData} className="bg-purple-500 text-sm p-2 rounded text-white"> Show results  </button>
                                    </div>
                                    {/* Filter items end */}
                                </div>
                            </div>
                            {/* Display buttons */}
                            <div className="p-2  flex gap-3">
                                {
                                    displayTypes.map((button) => {
                                        return <button onClick={() => { setDisplayType(button.type) }} title={` Show students info as a ${button.type} `} className={` w-12 h-10 rounded border border-slate-300 ${button.type === displayType ? 'bg-purple-500 text-white' : 'bg-gray-50'} `} >
                                            <FontAwesomeIcon icon={button.icon} />
                                        </button>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <details className="border border-slate-300 my-5 rounded p-4 ">
                    <summary className="cursor-pointer text-purple-900 font-semibold">
                        Filters
                    </summary>

                    <div className="flex flex-wrap items-center gap-3 text-slate-500 text-sm mt-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.code}
                                onClick={() => removeFilter(filter.code)}
                                className="p-2 rounded bg-slate-100 text-slate-600 flex items-center gap-2"
                            >
                                {filter.filter} <strong>{filter.value || ''}</strong>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        ))}
                        {!filters.length ? <p className="text-slate-500">  No filters yet </p> : ''}
                    </div>
                </details>

            </div>
            {/* Student information  */}
            {studentData.length ? getStudentInformation() :


                <div className="p-10 bg-white border rounded border-slate-300 flex items-center justify-center">
                    <h1 className="text-2xl"> No results found  </h1>
                </div>

            }

        </div>
    )
}


export default StudentsListPage;