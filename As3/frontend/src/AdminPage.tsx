import { Button } from "@nextui-org/react"
import { useState } from "react";
import StudentTable from "./students/StudentTable";
import AddStudent from "./students/AddStudent";
import TeacherTable from "./teachers/TeacherTable";
import AddTeacher from "./teachers/AddTeacher";

const AdminPage = () => {
  const [showStudent, setShowStudent] = useState(true);
  return (
    <div>
        <div className="flex m-2 flex-row gap-2 my-4">
            <Button className="flex flex-grow mx-5" color="primary" onClick={()=>setShowStudent(true)}>Show Student Database</Button>
            <Button className="flex flex-grow mx-5" color="primary" onClick={()=>setShowStudent(false)}>Show Teacher Database</Button>
        </div>
        <div className="flex m-2 flex-row gap-2">
            <AddStudent />
            <AddTeacher />
        </div>
        <div className="m-7">

          {showStudent ? (<StudentTable />) : (<TeacherTable />)}
        </div>
    </div>
  )
}
export default AdminPage;