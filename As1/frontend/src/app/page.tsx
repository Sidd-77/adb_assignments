"use client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UpdateModal from "./ui/updatemodal";
import CreateModal from "./ui/createmodal";
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (prn) => {
    await axios.post("http://localhost:3000/delete", { prn: prn });
    window.location.reload();
  }

  return (
    <div className=" shadow-lg  flex flex-col">
      <div className="flex  justify-center">
        <h1 className="text-4xl text-center font-bold py-4">
          Student Information
        </h1>
      </div>
      <div className=" flex  justify-center rounded-lg">
        <table className="table-auto bg-blue-300 rounded-lg">
          <thead className="">
            <tr>
              <th className="bg-blue-800 text-white  my-5 text-center py-4">
                PRN
              </th>
              <th className="bg-blue-800 text-white  my-5 text-center py-4">
                NAME
              </th>
              <th className="bg-blue-800 text-white mx-5 px5 my-5 text-center py-4">
                Update
              </th>
              <th className="bg-blue-800 text-white mx-5 px5 my-5 text-center py-4">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr>
                  <td className=" px-8 py-4">{d[0]}</td>
                  <td className=" px-8 py-4">{d[1]}</td>
                  <td className=" px-8 py-4">
                    <UpdateModal prn={d[0]} name={d[1]} />
                  </td>
                  <td className=" px-8 py-4">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=> handleDelete(d[0])}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex  justify-center m-5">
        <CreateModal />
      </div>
    </div>
  );
}
