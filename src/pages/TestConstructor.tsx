import React from "react";
import "../styles/TestConstructor.scss";
import AddFirstTask from "../components/constructor/AddFirstTask";
import QuestionForm from "../components/constructor/QuestionForm";
import Button from "../ui/Button";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { addEmptyQuestion } from "../app/slices/questionSlice";
import { setFormStatus } from "../app/slices/constructorErrorSlice";
import SaveForm from "../components/constructor/SaveForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const MAX_TEST_SIZE = 30;
const MIN_TEST_SIZE = 6;

export const notify = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    style: {
      fontFamily: "Montserrat",
      fontSize: "1.3rem",
    },
  });
};

const TestConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state: RootState) => state.questionConstructor);
  const [saveForm, setSaveForm] = React.useState<boolean>(false);

  const isQuestions = !!questions.length;

  const renderAllQuestions = questions.map((question, index) => <QuestionForm {...question} key={index} />);

  const submitConstructor = () => {
    const isInvalidForms = questions.some((form) => {
      const { answers, question } = form.isValid;

      return answers !== true || question !== true;
    });

    dispatch(setFormStatus(isInvalidForms));
    if (questions.length < MIN_TEST_SIZE) {
      notify(`Minimum length of the test is ${MIN_TEST_SIZE}`);
      return;
    }
    if (questions.length > MAX_TEST_SIZE) {
      notify(`Maximum length of the test is ${MAX_TEST_SIZE}`);
      return;
    }
    if (!isInvalidForms) onToggleSaveForm();
  };

  const onAddEmptyQuestion = () => {
    dispatch(addEmptyQuestion());
  };

  const onToggleSaveForm = () => {
    setSaveForm((prev) => !prev);
  };

  const toggleStyles = isQuestions
    ? { padding: "3rem 3rem 8rem 3rem" }
    : { padding: "3rem", display: "flex", justifyContent: "center", alignItems: "center" };
  const mainContent = isQuestions ? renderAllQuestions : <AddFirstTask onAddTask={onAddEmptyQuestion} />;

  React.useEffect(() => {
    if (questions.length === 0) {
      dispatch(setFormStatus(false));
    }
  }, [questions]);

  return (
    <>
      <div className="test-constructor" style={toggleStyles}>
        <main className="test-constructor__questions">{mainContent}</main>
        {isQuestions ? (
          <div className="test-constructor__control">
            <Button design="add" text="Add question" onClick={onAddEmptyQuestion} />
            <Button design="basic" text="Save form" onClick={submitConstructor} />
          </div>
        ) : null}
      </div>
      {saveForm && <SaveForm toggleOverlay={onToggleSaveForm} />}
      <ToastContainer />
    </>
  );
};

export default TestConstructor;
