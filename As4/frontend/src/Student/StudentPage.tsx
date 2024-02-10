import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const getTests = async () => {
    const response = await axios.get("http://localhost:3000/getTests");
    const data = response.data;
    console.log(data);
    setTests(data);
  };

  useEffect(() => {
    getTests();
  }, []);

  const hadleAttempt = (id) => {
    navigate("/test/"+id);
  };

  return (
    <div>
      <Card>
        <CardBody>
        <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn className=" font-bold text-md">Test Id</TableColumn>
                <TableColumn className=" font-bold text-md">Test Name</TableColumn>
                <TableColumn className=" font-bold text-md">Duration</TableColumn>
                <TableColumn className=" font-bold text-md">Action</TableColumn>
              </TableHeader>
              <TableBody>
                {tests.map((test, index) => (
                  <TableRow key={index}>
                    <TableCell>{test.id}</TableCell>
                    <TableCell>{test.name}</TableCell>
                    <TableCell>{test.duration+" min"}</TableCell>
                    <TableCell><Button color="primary" onClick={()=>hadleAttempt(test.id)}>Start Test</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardBody>
      </Card>
    </div>
  );
};
export default StudentPage;
