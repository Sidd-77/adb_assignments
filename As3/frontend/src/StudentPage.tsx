import { UserContext } from "./Context";
import { useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

const StudentPage = () => {
  const { userStudent, setUserStudent } = useContext(UserContext);
  return (
    <div className="m-5">
      <Card>
        <CardHeader>Student's Information</CardHeader>
        <CardBody>
          <h1>Welcome {userStudent.student_name}</h1>
          <h2>Student ID: {userStudent.student_id}</h2>
          <h2>Grade: {userStudent.grade}</h2>
          <h2></h2>
        </CardBody>
      </Card>
    </div>
  );
};
export default StudentPage;
