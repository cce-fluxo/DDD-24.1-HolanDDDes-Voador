import { useField } from "formik";

interface InputTextProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  style?: string;
}

const InputText = ({ label,style="", ...props }: InputTextProps) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name} className="">
        {label}
      </label>
      <input className= {`text-input ${style}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-800">{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputText;
