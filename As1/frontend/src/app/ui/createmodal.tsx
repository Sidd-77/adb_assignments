import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CreateModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [prn1, setPrn] = useState("");
  const [name1, setName] = useState("");

  const handleSubmit = () => {
    axios.post("http://localhost:3000/", { prn: prn1, name: name1 });
  }

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Insert Information
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className=" text-center text-xl mb-5">Update Information</h2>
        <form className="w-full max-w-lg flex flex-col">
          <div className="flex flex-wrap -mx-3 ">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 mb-2">
                PRN
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="prn"
                type="text"
                onChange={(e) => setPrn(e.target.value)}
                value={prn1}
              />
              
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 mb-2">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name1}
              />
              
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded " onClick={handleSubmit}> Submit </button>
        </form>
      </Modal>
    </div>
  );
};
export default CreateModal;
