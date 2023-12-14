import React from "react";
import Overlay from "../../ui/Overlay";
import "../../styles/SaveForm.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import Input, { THookProps } from "../../ui/Input";
import { IoMdClose } from "react-icons/io";
import Button from "../../ui/Button";
import { RootState, useAppDispatch, useAppSelector } from "../../app/store";
import { clearState, constructorSelect, statsSelector } from "../../app/slices/questionSlice";
import { Cell, Pie, PieChart } from "recharts";
import { usePostTestMutation } from "../../app/api/testApi";
import Spinner from "../../ui/Spinner";
import UploadImage from "../../ui/UploadImage";

type TSaveForm = {
  toggleOverlay: () => void;
};

type TSaveFormInputs = {
  save: string;
};

const saveInput: THookProps<TSaveFormInputs> = {
  name: "save",
  label: "Name of the test",
  required: {
    value: true,
    message: "This field is required",
  },
  minLength: {
    value: 2,
    message: "Min.length is 2 symbols",
  },
  maxLength: {
    value: 50,
    message: "Max.length is 50 symbols",
  },
  type: "text",
  icon: "text",
};

const colors = ["#2b788b", "#c4a24c"];

const SaveForm: React.FC<TSaveForm> = ({ toggleOverlay }) => {
  const stats = useAppSelector((state: RootState) => statsSelector(state));
  const questions = useAppSelector((state: RootState) => constructorSelect(state));
  const dispatch = useAppDispatch();
  const [postTest, { isLoading }] = usePostTestMutation();
  const [image, setImage] = React.useState<File | null>(null);
  const [imageError, setImageError] = React.useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSaveFormInputs>();

  const onSaveForm: SubmitHandler<TSaveFormInputs> = async ({ save }) => {
    if (!image) {
      setImageError(true);
      return;
    }
    await postTest({ name: save, questions, image: image });
    dispatch(clearState());
    toggleOverlay();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedFileTypes = ["image/svg+xml", "image/png", "image/jpeg"];

      if (allowedFileTypes.includes(file.type)) {
        setImage(file);
        setImageError(false);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="save-form">
        <div className="save-form__head">
          <h4 className="save-form__title">Save the test</h4>
          <IoMdClose onClick={toggleOverlay} />
        </div>
        <form>
          <Input register={register} {...saveInput} errorMessage={errors.save?.message} />
          <UploadImage uploadFile={handleFileUpload} activeImage={image} isError={imageError} />
        </form>
        <div className="save-form__stats">
          <PieChart width={170} height={170}>
            <Pie data={stats} cx="50%" cy="50%" outerRadius={40} label dataKey="value">
              {stats.map((_, index) => {
                return <Cell key={`cell-${index}`} fill={colors[index]} />;
              })}
            </Pie>
          </PieChart>
          <ul>
            <li>Multiple answears</li>
            <li>Single answear</li>
          </ul>
        </div>
        <div className="save-form__buttons">
          <Button design="cancel" text="Cancel" onClick={toggleOverlay} />
          <Button design="basic" text="Add test" onClick={handleSubmit(onSaveForm)} />
        </div>
      </div>
      <Overlay color onClickOverlay={toggleOverlay} />
    </>
  );
};

export default SaveForm;
