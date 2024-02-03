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

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/students");
    setStudents(response.data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const response = await axios.post("http://localhost:3000/deleteStudent", {
      student_id: id,
    });
    setFetchAgain(!fetchAgain);
  }

  useEffect(() => {
    fetchStudents();
  }, [fetchAgain]);

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Grades</TableColumn>
          <TableColumn>email</TableColumn>
          <TableColumn>Update</TableColumn>
          <TableColumn>Delete</TableColumn>
        </TableHeader>
        <TableBody>
          {students.map((student: any) => {
            return (
              <TableRow key={student.student_id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.student_name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell><UpdateModal student={student} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                    </TableCell>
                <TableCell><Button color='danger' onClick={()=> handleDelete(student.student_id)}>
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
export default StudentTable;
