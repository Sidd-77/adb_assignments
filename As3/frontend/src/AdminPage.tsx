import { Button } from "@nextui-org/react"
import { useState } from "react";
import StudentTable from "./students/StudentTable";
import AddStudent from "./students/AddStudent";
import TeacherTable from "./teachers/TeacherTable";
import AddTeacher from "./teachers/AddTeacher";
import AddCourse from "./coursese/AddCourse";
import CourseTable from "./coursese/CourseTable";

const AdminPage = () => {
  const [showStudent, setShowStudent] = useState(true);
  const [showCourses, setShowCoursese] = useState(false);
  return (
    <div>
        <div className="flex m-2 flex-row gap-2 my-4">
            <Button className="flex flex-grow mx-5" color="primary" onClick={()=>setShowStudent(true)}>Show Student Database</Button>
            <Button className="flex flex-grow mx-5" color="primary" onClick={()=>setShowStudent(false)}>Show Teacher Database</Button>
            <Button className="flex flex-grow mx-5" color="primary" onClick={()=>setShowCoursese(!showCourses)}>Show Courses Database</Button>
        </div>
        <div className="flex m-2 flex-row gap-2">
            <AddStudent />
            <AddTeacher />
            <AddCourse />
        </div>
        <div className="m-7">
          {
            showCourses ? (<CourseTable />) : (<></>)
          }
          {showStudent ? (<StudentTable />) : (<TeacherTable />)}
        </div>
    </div>
  )
}
export default AdminPage;