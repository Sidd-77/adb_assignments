import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

export default function AddQuestion() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const [answer, setAnswer] = useState("A");
  const [image, setImage] = useState('');

  const handleSelectionChange = (e) => {
    setAnswer(e.target.value);
  };

  const handlesubmit = async () => {
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("question", question);
    // formData.append("options", JSON.stringify(options));
    // formData.append("answer", answer);
    // console.log(formData);
    const response = await axios
      .post("http://localhost:3000/addQuestion", {
        question: question,
        options: options,
        answer: answer,
        image: image,
      })
      .then((response) => {
        // handle the response
        window.location.reload();
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  const handleopetionsChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button color="primary" className="flex-grow" onPress={onOpen}>
        Add Question
      </Button>
      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add question :{" "}
              </ModalHeader>

              <ModalBody>
                <Input
                  type="text"
                  size="lg"
                  label="Question Description"
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <div className="flex gap-2">
                  <Input
                    type="text"
                    name="A"
                    className=" basis-1/2"
                    label="Option A"
                    onChange={handleopetionsChange}
                  />
                  <Input
                    type="text"
                    name="B"
                    className=" basis-1/2"
                    label="Option B"
                    onChange={handleopetionsChange}
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    name="C"
                    className=" basis-1/2"
                    label="Option C"
                    onChange={handleopetionsChange}
                  />
                  <Input
                    type="text"
                    name="D"
                    className=" basis-1/2"
                    label="Option D"
                    onChange={handleopetionsChange}
                  />
                </div>
                <Select
                  label="Correct Option"
                  variant="bordered"
                  color="success"
                  placeholder="Correct Option"
                  selectedKeys={[answer]}
                  className="max-w-xs"
                  onChange={handleSelectionChange}
                >
                  <SelectItem key="A" value="A">
                    A
                  </SelectItem>
                  <SelectItem key="B" value="B">
                    B
                  </SelectItem>
                  <SelectItem key="C" value="C">
                    C
                  </SelectItem>
                  <SelectItem key="D" value="D">
                    D
                  </SelectItem>
                </Select>
                <Input
                  accept="image/*"
                  placeholder="Provid Image Url"
                  onChange={(e) => setImage(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancle
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handlesubmit}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
