import { Navbar, NavbarBrand, Link, Button, Avatar } from "@nextui-org/react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./Context";
import { useContext } from "react";
import Login from "./Login";
import TeacherPage from "./Teacher/TeacherPage";
import StudentPage from "./Student/StudentPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function App() {
  const { Uteacher, setUteacher, Ustudent, setUstudent } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUteacher({});
    setUstudent({});
    localStorage.removeItem('Uteacher');
    localStorage.removeItem('Ustudent');
    navigate('/');
  }

  useEffect(() => {
    localStorage.getItem('Uteacher') && setUteacher(JSON.parse(localStorage.getItem('Uteacher')||'{}'));
    localStorage.getItem('Ustudent') && setUstudent(JSON.parse(localStorage.getItem('Ustudent')||'{}'));  
  },[Ustudent, Uteacher])

  return (
    <div>
      <Navbar maxWidth="full" className=" bg-teal-100">
        <NavbarBrand className=" text-3xl font-bold mb-2">Assignment 4</NavbarBrand>
        

        {Uteacher.id && <div>{Uteacher.name}  </div>}
        {Ustudent.id && <div>{Ustudent.name}  </div>}
        <Avatar src={Uteacher.id ? Uteacher.avatar : Ustudent.avatar} size="md" />
        {Uteacher.id || Ustudent.id ? <Button onClick={handleLogout}>Logout</Button> : null}
        
      </Navbar>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </div>
  );
}
