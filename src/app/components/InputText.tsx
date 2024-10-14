import { useField } from "formik";

interface InputTextProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const InputText = ({ label, ...props }: InputTextProps) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name} className="">
        {label}
      </label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputText;
