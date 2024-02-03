import { Button, Divider } from "@nextui-org/react";
import StudentTable from "./students/StudentTable";
import AddStudent from "./students/AddStudent";
import { useContext } from "react";
import { UserContext } from "./Context";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const TeacherPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [info, setInfo] = useState(false);

  return (
    <div>
      <div className="flex m-2 flex-row gap-2 my-4">
        <Button className="flex flex-grow mx-5" color="primary">
          Show Student Database
        </Button>
        <AddStudent />
        <Button
          className="flex flex-grow mx-5"
          color="primary"
          onClick={() => setInfo(!info)}
        >
          Show Teacher's Information
        </Button>
      </div>
      <div className="flex m-2 flex-row gap-2 basis-2">
        {info && (
          <Card className="flex flex-grow m-5">
            <CardHeader>Teacher's Information</CardHeader>
            <Divider />
            <CardBody>
              <p>Name: {user.teacher_name}</p>
              <p>Email: {user.email}</p>
              <p>ID: {user.teacher_id}</p>
              <p>Subject: {user.subject}</p>
            </CardBody>
          </Card>
        )}
      </div>
      <div className="m-7">
        <StudentTable />
      </div>
    </div>
  );
};
export default TeacherPage;
