import { Button, Card, CardBody } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import AddQuestion from "./AddQuestion";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateTest from "./CreateTest";

const TeacherPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showquestion, setShowquestion] = useState(false);
  const [tests, setTests] = useState([]);

  const getQuestions = async () => {
    const response = await fetch("http://localhost:3000/getQuestions");
    const data = await response.json();
    console.log(data);
    setQuestions(data);
  };

  const getTests = async () => {
    const response = await axios.get("http://localhost:3000/getTests");
    const data = response.data;
    console.log(data);
    setTests(data);
  };

  const hadlequestiondelete = async (id) => {
    const response = await axios.post("http://localhost:3000/deleteQuestion", {id});
    getQuestions();
  };

  useEffect(() => {
    getQuestions();
    getTests();
  }, []);

  return (
    <div className="p-2">
      <Card>
        <CardBody className="flex flex-row gap-2">
          <CreateTest />
          <AddQuestion />
          <Button color='primary' className="flex-grow">Test Report</Button>
          <Button color='primary' className="flex-grow" onClick={()=>{
            setShowquestion(!showquestion);
            getQuestions();
          }}>Question Bank</Button>
        </CardBody>
        
        <CardBody>
          <div className="my-2">
            Created Tests:
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
                    <TableCell><Button color="danger">Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {
            showquestion && (
              <div>
                Question Bank:
                <Table isStriped aria-label="Example static collection table">
                  <TableHeader className="" >
                    <TableColumn className=" font-bold text-md">Question Id</TableColumn>
                    <TableColumn className=" font-bold text-md">Question</TableColumn>
                    <TableColumn className=" font-bold text-md">Options</TableColumn>
                    <TableColumn className=" font-bold text-md">Answer</TableColumn>
                    <TableColumn className=" font-bold text-md">Delete</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {questions.map((question:any, index) => (
                      <TableRow key={index}>
                        <TableCell>{question.id}</TableCell>
                        <TableCell>{question.question}</TableCell>
                        <TableCell>
                          {Object.keys(question.options).map((option, index) => (
                            <p className="" key={index}>
                              {option} : {question.options[option]}
                            </p>
                          ))}
                        </TableCell>
                        <TableCell>{question.answer}</TableCell>
                        <TableCell><Button color="danger" onClick={()=>hadlequestiondelete(question.id)}>Delete</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        </CardBody>
      </Card>
    </div>
  );
};
export default TeacherPage;
