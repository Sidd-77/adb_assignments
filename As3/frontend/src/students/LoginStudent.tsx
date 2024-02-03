import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { UserContext } from "../Context";

export default function LoginStudents() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {userStudent, setUserStudent} = useContext(UserContext);




  const handleLogin = async () => {
    const response = await axios.post('http://localhost:3000/loginStudent', {email, password});
    if (response.data !== 'fail') {
      console.log('success request');
      setUserStudent(response.data);
      navigate('/student');
    }else {
      console.log('failed request');
      navigate('/login');
    }
  }


  return (
    <>
      <Button onPress={onOpen} variant="flat"
            color="secondary"
            >Log In</Button>
      <Modal 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleLogin}>
                  Log in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
