import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import LoginTeacher from "./teachers/LoginTeacher";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-2 p-2 px-10 py-20">
      <Card className="flex-grow">
        <CardHeader className="">Admin</CardHeader>
        <Divider />
        <CardBody>
          <Button
            variant="flat"
            color="secondary"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Log in
          </Button>
        </CardBody>
      </Card>
      <Card className="flex-grow">
        <CardHeader>Teachers</CardHeader>
        <Divider />
        <CardBody>
          <LoginTeacher />
        </CardBody>
      </Card>
      <Card className="flex-grow">
        <CardHeader>Students</CardHeader>
        <Divider />
        <CardBody>
          <Button>Log in</Button>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
