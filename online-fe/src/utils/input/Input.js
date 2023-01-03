import "../../components/search/search.css";

export const Input = ({
  type,
  name,
  accept,
  handleChange,
  placeholder,
  required = false,
  disabled = false,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        required={required}
        accept={accept}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  );
};
export default Input;
