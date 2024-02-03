import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";


const AddStudent = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [grades, setGrades] = useState('');

    const handleSubmit = async () => {
        const response = await axios.post('http://localhost:3000/addStudent', {name, email, grades});
        window.location.reload();
    }

    return (
      <>
        <Button className="flex flex-grow mx-5" onPress={onOpen} color="primary">Enroll Student</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Insert Information</ModalHeader>
                <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  variant="bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="email"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="grades"
                  variant="bordered"
                  value={grades}
                  onChange={(e) => setGrades(e.target.value)}
                />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
export default AddStudent