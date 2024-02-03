import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";


const UpdateModal = ({teacher, fetchAgain, setFetchAgain}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        setName(teacher.teacher_name);
        setEmail(teacher.email);
        setSubject(teacher.subject);
    }, [teacher]);

    const handleUpdate = async () => {
        const response = await axios.post('http://localhost:3000/updateTeacher', {name, email, subject, teacher_id: teacher.teacher_id});
        setFetchAgain(!fetchAgain);
    }

    return (
      <>
        <Button onPress={onOpen} color="primary">Update</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Update Information</ModalHeader>
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
                  label="subject"
                  variant="bordered"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={handleUpdate}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
export default UpdateModal