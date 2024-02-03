import "./App.css";
import Login from "./Login";
import AdminPage from "./AdminPage";
import { Route, Routes } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Link,
  Button,
} from "@nextui-org/react";
import TeacherPage from "./TeacherPage";
import { UserContext } from "./Context";
import { useContext } from "react";
import { Avatar } from "@nextui-org/react";

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <Navbar className="flex  justify-between w-full">
        <NavbarBrand>
          <p className="font-bold text-3xl">Student Database Management</p>
        </NavbarBrand>

        {user.email ? (
          <>
            
            {user.teacher_name? <p>{user.teacher_name}</p> : <></>}
            <Avatar showFallback src="https://images.unsplash.com/broken" />
            <Button as={Link} color="primary" href="/" variant="flat" onClick={()=>{
              setUser({});
            }}>
              Log Out
            </Button>
          </>
        ) : (
          <></>
        )}
      </Navbar>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </div>
  );
}

export default App;
