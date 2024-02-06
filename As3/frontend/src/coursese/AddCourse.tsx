import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import axios from "axios";

const AddCourse = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [courseName, setCourseName] = useState("");
  const [teacher, setTeacher] = useState('');
  const [teachers, setTeachers] = useState([{}]);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/addCourse", {teacher_id: teacher, course_name: courseName});
    console.log(response.data);
  };

  const fetchTeachers = async () => {
    const response = await axios.get("http://localhost:3000/teachers");
    setTeachers(response.data);
  };

  const handleSelectionChange = (e) => {
    setTeacher(e.target.value);
  };


  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <>
      <Button className="flex flex-grow mx-5" onPress={onOpen} color="primary">
        Add Course
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Insert Information
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Course Name"
                  variant="bordered"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                <Select
                  label="Teacher"
                  placeholder="Select teacher"
                  className="max-w-xs"
                  selectedKeys={teacher}
                  onChange={handleSelectionChange}
                >
                  {teachers.map((t:any) => (
                    <SelectItem key={t.teacher_id} value={t.teacher_id} >
                      {t.teacher_name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddCourse;
