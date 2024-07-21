"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "../../components/Sidebar";
import QuestionCard from "../../components/QuestionCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft } from "@/components/icons/arrow-left";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Question {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  topicid: number;
}
export default function Quiz({ params }: { params: { courseName: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [attempted, setAttempted] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(600); // Default to 10 minutes
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  // const [topicid, setTopicid] = useState<number>();
  const paramData = decodeURIComponent(params.courseName).split("@");
  //  console.log(paramData);
  const courseName = paramData[0];
  const courseId = paramData[1];
  const studentid = localStorage.getItem("collegeId");
  const topicid = paramData[3];
  const topicName = paramData[4];
  const studentname = "John";
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/student");
    }
    if (typeof window !== "undefined") {
      const storedTimeLeft = localStorage.getItem("timeLeft");
      const storedHasStarted = localStorage.getItem("hasStarted");
      if (storedTimeLeft) setTimeLeft(parseInt(storedTimeLeft, 10));
      if (storedHasStarted === "true") setHasStarted(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/student/questions/${topicid}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const resp = await response.json();
        if (response.status === 200) {
          console.log("Questions retrieval successful!", resp.data);
          setQuestions(resp.data);
          setAttempted(new Array(resp.data.length).fill(false));
        } else {
          console.error("Module Data retrieval failed!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [topicid]);

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (typeof window !== "undefined") {
            localStorage.setItem("timeLeft", newTimeLeft.toString());
          }
          if (newTimeLeft <= 0) {
            clearInterval(timer);
            handleFinish();
          }
          return newTimeLeft;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasStarted]);

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleFinish = async () => {
    setTimeLeft(600);
    const score = questions.reduce((acc, question, index) => {
      if (question.correctOption === selectedOptions[question.id]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(score);

    // Submit the performance data
    const performanceData = {
      studentid: studentid,
      studentname: "John Doe",
      courseid: courseId,
      moduleid: 1,
      topicid: topicid,
      score: score,
    };

    // fetch('/api/student/submitScore', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(performanceData)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Performance data saved:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error saving performance data:', error);
    //   });

    const url = `/api/student/submitScore/${studentid}/${studentname}/${courseId}/${1}/${topicid}/${score}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const resp = await response.json();
      if (response.status === 200) {
        console.log("Score Submitted");
      } else {
        console.error("Module Data retrieval failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Reset the local storage and state
    if (typeof window !== "undefined") {
      localStorage.removeItem("hasStarted");
      localStorage.removeItem("timeLeft");
    }
    setHasStarted(false);
  };

  const handleSelectOption = (option: string) => {
    const questionId = questions[currentIndex].id;
    const selectedOption = option.split(",")[0]; // Extract part before the comma
    const newSelectedOptions = {
      ...selectedOptions,
      [questionId]: selectedOption,
    };
    setSelectedOptions(newSelectedOptions);
    const newAttempted = [...attempted];
    newAttempted[currentIndex] = true;
    setAttempted(newAttempted);
  };

  const handleStartQuiz = () => {
    setHasStarted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasStarted", "true");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 relative">
      <div className="w-2/3 flex flex-col items-center">
        <Card className="w-full mb-4 p-4 text-center relative">
          <div className="flex flex-row space-x-4">
            {/* <Button variant={"outline"} onClick={() => router.back()}>
              <ArrowLeft />
              <p className="pl-2">Go Back</p>
            </Button> */}
           { score === null ?<AlertDialog>
              <AlertDialogTrigger> <ArrowLeft />
              <p className="pl-2">Go Back</p></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                   once you go back your current responses will be submitted and cannot reattempt the quiz
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button onClick={() => {handleFinish(); router.back();}}>Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>:
            <Button variant={"outline"} onClick={() => router.back()}>
            <ArrowLeft />
            <p className="pl-2">Go Back</p>
          </Button>
            }

            <h1 className="text-3xl font-bold text-red-500">
              Course:{courseName} Topic:{topicName}
            </h1>
          </div>
          {hasStarted && (
            <div className="text-xl absolute top-4 right-4">
              {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </div>
          )}
        </Card>
        <div className="flex w-full h-[calc(100vh-8rem)]">
          {score === null ? (
            <>
              <div className="flex-1 flex flex-col bg-white p-4 rounded-md shadow-lg h-full">
                {hasStarted ? (
                  questions.length > 0 ? (
                    <QuestionCard
                      question={questions[currentIndex].question}
                      options={[
                        questions[currentIndex].option1,
                        questions[currentIndex].option2,
                        questions[currentIndex].option3,
                        questions[currentIndex].option4,
                      ]}
                      currentIndex={currentIndex}
                      totalQuestions={questions.length}
                      onNext={handleNextQuestion}
                      onPrevious={handlePreviousQuestion}
                      onSelectOption={handleSelectOption}
                      selectedOption={
                        selectedOptions[questions[currentIndex].id] || ""
                      }
                    />
                  ) : (
                    <p>Loading questions...</p>
                  )
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-xl">Click "Start Quiz" to begin.</p>
                    <Button onClick={handleStartQuiz} className="mt-4">
                      Start Quiz
                    </Button>
                  </div>
                )}
              </div>
              <Sidebar
                questions={questions}
                currentIndex={currentIndex}
                onChangeIndex={setCurrentIndex}
                attempted={attempted}
                selectedOptions={selectedOptions}
                onFinish={handleFinish}
              />
            </>
          ) : (
            <Card className="w-full mb-4 p-4 text-center">
              <h2 className="text-2xl font-bold">Your Score</h2>
              <p className="text-xl">
                {score} / {questions.length}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
