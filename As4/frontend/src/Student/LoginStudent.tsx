import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
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
} from "@nextui-org/react";
import { UserContext } from "../Context";

export default function LoginStudents() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { Ustudent, setUstudent } = useContext(UserContext);
  const [logIn, setLogIn] = useState(false);

  const handleLoginSignup = async () => {
    const response = await axios.post(
      `http://localhost:3000/student${logIn ? "/login" : "/register"}`,
      { email, password, name }
    );
    if (response.data !== "fail") {
      console.log("success request");
      setUstudent(response.data);
      localStorage.setItem("Ustudent", JSON.stringify(response.data));
      navigate("/student");
    } else {
      console.log("failed request");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          onPress={onOpen}
          variant="flat"
          color="secondary"
          className="flex-grow"
          onClick={() => setLogIn(true)}
        >
          Log In
        </Button>
        <Button
          onPress={onOpen}
          variant="flat"
          color="secondary"
          className="flex-grow"
          onClick={() => setLogIn(false)}
        >
          Sign Up
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {logIn ? "Log In" : "Sign Up"}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!logIn && (
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    variant="bordered"
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between"></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleLoginSignup}>
                  {logIn ? "Log In" : "Sign Up"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
