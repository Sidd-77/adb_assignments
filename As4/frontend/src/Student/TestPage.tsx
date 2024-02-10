import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button, Card, CardBody, CardFooter, Divider, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context";

const TestPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState({});
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [ind, setInd] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();
  const { Ustudent, setUstudent } = useContext(UserContext);

  const getTest = async () => {
    setLoading(true);
    let { data } = await axios.get(`http://localhost:3000/getTest/${id}`);
    data = data[0];
    console.log(data);
    setTest(data);
    let tmp = data.questions;
    console.log(tmp);
    tmp = tmp.map(async (q: any) => {
      let t1 = await axios.get(`http://localhost:3000/getQuestion/${q}`);
      console.log(t1.data[0]);
      return t1.data[0];
    });
    console.log(tmp);
    setQuestions(await Promise.all(tmp));
    setLoading(false);
  };

  const hadleSelect = (id: any, ans: any) => {
    let tmp = selected;
    tmp[id] = ans;
    setSelected(tmp);
    console.log(selected);
  }

  const handleSubmit = async () => {
    let score = 0;
    let tmp = selected;
    for (let i = 0; i < questions.length; i++) {
      let q = questions[i];
      if (q.answer === tmp[q.id]) {
        score++;
      }
    }
    setScore(score);
    console.log(score);
    setSubmitted(true);
    alert(`Your score is ${score} out of ${questions.length}`);
    

    const response = await axios.post('http://localhost:3000/submitTest', {
      student_id: Ustudent.id,
      test_id: test.id,
      score: score
    }).then((response) => {
      console.log(response);
      navigate('/student');
    });
  };

  useEffect(() => {
    getTest();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-2">
      <Card>
        <CardBody>
          {questions?.length > 0 && (
            <div>
              {questions.map((q: any) => {
                return (
                  <Card className="p-2 my-2" key={q.id}>
                    <div>
                      <RadioGroup
                        label={q.question}
                      >
                        <Radio value="A" onClick={()=>hadleSelect(q.id,"A")} >{q.options.A}</Radio>
                        <Radio value="B" onClick={()=>hadleSelect(q.id,"B")} >{q.options.B}</Radio>
                        <Radio value="C" onClick={()=>hadleSelect(q.id,"C")} >{q.options.C}</Radio>
                        <Radio value="D" onClick={()=>hadleSelect(q.id,"D")} >{q.options.D}</Radio>
                      </RadioGroup>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardBody>
        <p>
          {selected.length > 0 && <p>fad</p>}
        </p>
        <Divider />
        <CardFooter>
          <Button className="" color="primary" onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default TestPage;
