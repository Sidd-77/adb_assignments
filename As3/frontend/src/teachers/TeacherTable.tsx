import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import UpdateModal from "./UpdateModal";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const fetchteachers = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/teachers");
    setTeachers(response.data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const response = await axios.post("http://localhost:3000/deleteTeacher", {
      teacher_id: id,
    });
    setFetchAgain(!fetchAgain);
  }

  useEffect(() => {
    fetchteachers();
  }, [fetchAgain]);

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Subject</TableColumn>
          <TableColumn>email</TableColumn>
          <TableColumn>Update</TableColumn>
          <TableColumn>Delete</TableColumn>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher: any) => {
            return (
              <TableRow key={teacher.teacher_id}>
                <TableCell>{teacher.teacher_id}</TableCell>
                <TableCell>{teacher.teacher_name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell><UpdateModal teacher={teacher} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                    </TableCell>
                <TableCell><Button color='danger' onClick={()=> handleDelete(teacher.teacher_id)}>
                    Delete
                    </Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default TeacherTable;
