import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import axios from "axios";

export default function CreateTest() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [testName, setTestName] = useState("");
  const [testDuration, setTestDuration] = useState("");
  const [testQuestions, setTestQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleClose = (id:any) => {
    let tmp = testQuestions.filter((question) => question !== id);
    setTestQuestions(tmp);
  };

  const hadleAddQuestion = (id:any) => {
    setTestQuestions([...testQuestions, id]);
  };

  const handleCreate = async () => {
    console.log(testName, testDuration, testQuestions);
    const response = await axios.post("http://localhost:3000/createTest", {
        name: testName,
        duration: testDuration,
        questions: testQuestions,
        }).then((response) => {
        // handle the response
        console.log(response.data);
        window.location.reload();
        }).catch((error) => {
        // handle errors
        console.log(error);
        });
  }

  const getQuestions = async () => {
    const response = await fetch("http://localhost:3000/getQuestions");
    const data = await response.json();
    setQuestions(data);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <Button color="primary" className="flex-grow" onPress={onOpen}>
        Create Test
      </Button>
      <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Test
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row  gap-2">
                  <Input label="Test Name"  onChange={(e)=>setTestName(e.target.value)}/>
                  <Input label="Test Duration in Minutes" type="number" onChange={(e)=>setTestDuration(e.target.value)} />
                </div>

                <div className="flex gap-2">
                    <p>Selected Questions :</p>
                  
                  {testQuestions.map((question, index) => (
                    <Chip
                      key={index}
                      onClose={() => handleClose(question)}
                      variant="flat"
                      color="secondary"
                    >
                      {question}
                    </Chip>
                  ))}
                </div>

                <div>
                  Question Bank:
                  <Table isStriped aria-label="Example static collection table">
                    <TableHeader className="">
                      <TableColumn className=" font-bold text-md">
                        Question Id
                      </TableColumn>
                      <TableColumn className=" font-bold text-md">
                        Question
                      </TableColumn>
                      <TableColumn className=" font-bold text-md">
                        Answer
                      </TableColumn>
                      <TableColumn className=" font-bold text-md">
                        Action
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      {questions.map((question: any, index) => (
                        <TableRow key={index}>
                          <TableCell>{question.id}</TableCell>
                          <TableCell>{question.question}</TableCell>
                          <TableCell>
                            <p>
                              {question.answer} :{" "}
                              {question.options[question.answer]}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Button color="primary" onClick={()=>hadleAddQuestion(question.id)}> Add </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleCreate}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
