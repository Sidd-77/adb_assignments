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


const CourseTable = ({}) => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([{}])
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/courses");
    setCourses(response.data);
    setLoading(false);
  }

  const fetchTeachers = async () => {
    const response = await axios.get("http://localhost:3000/teachers");
    setTeachers(response.data);
  }

  const handleDelete = async (id: number) => {
    const response = await axios.post("http://localhost:3000/deleteCourse", {
      course_id: id,
    });
    setFetchAgain(!fetchAgain);
  }

  useEffect(() => {
    fetchCourses();
    fetchTeachers();

  }, [fetchAgain]);

  return (
    <div className=" mb-5">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Course Id</TableColumn>
          <TableColumn>Cousre Name</TableColumn>
          <TableColumn>Teacher</TableColumn>
          <TableColumn>Delete</TableColumn>
        </TableHeader>
        <TableBody>
          {courses.map((course: any) => {
            return (
              <TableRow key={course.course_id}>
                <TableCell>{course.course_id}</TableCell>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>{course.teacher_name}</TableCell>
                <TableCell><Button color="danger" onClick={()=>handleDelete(course.course_id)}>Delete</Button></TableCell>
                {/* <TableCell><UpdateModal student={student} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                    </TableCell>
                <TableCell><Button color='danger' onClick={()=> handleDelete(student.student_id)}>
                    Delete
                    </Button></TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default CourseTable;
