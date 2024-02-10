import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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

export default function ReportModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [report, setReport] = useState([]);
  const getReport = async () => {
    const response = await axios.get("http://localhost:3000/getTestResults");
    const data = response.data;
    setReport(data);
    console.log(data);
  };

  useEffect(() => {
    getReport();
  }, []);
  return (
    <>
      <Button color="primary" className="flex-grow" onPress={onOpen}>
        Test Report
      </Button>
      <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Test Report
              </ModalHeader>
              <ModalBody>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>Student Id</TableColumn>
                    <TableColumn>Student Name</TableColumn>
                    <TableColumn>Test Id</TableColumn>
                    <TableColumn>Test Name</TableColumn>
                    <TableColumn>Score</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {report.map((r: any) => {
                      return (
                        <TableRow key={r.id}>
                          <TableCell>{r.id}</TableCell>
                          <TableCell>{r.student_name}</TableCell>
                          <TableCell>{r.test_id}</TableCell>
                          <TableCell>{r.test_name}</TableCell>
                          <TableCell>{r.score}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
