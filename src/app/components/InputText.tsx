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
      <label htmlFor={props.name} className="w-full font-poppins font-medium text-xl text-preto">
        {label}
      </label>
      <input className= {`text-input ${style}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-700">{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputText;
