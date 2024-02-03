import { Button } from "@nextui-org/react";
import StudentTable from "./students/StudentTable";
import AddStudent from "./students/AddStudent";
import { useContext } from "react";
import { UserContext } from "./Context";

const TeacherPage = () => {
  const {user, setUser} = useContext(UserContext);

  console.log(user);

  return (
    <div>
        <div className="flex m-2 flex-row gap-2 my-4">
            <Button className="flex flex-grow mx-5" color="primary" >Show Student Database</Button>
            <AddStudent />
        </div>
        <div className="flex m-2 flex-row gap-2 basis-2">
            
        </div>
        <div className="m-7">
          <StudentTable />
        </div>
    </div>
  )
}
export default TeacherPage;