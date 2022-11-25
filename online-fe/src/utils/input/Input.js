export const Input = ({
  type,
  name,
  accept,
  handleChange,
  placeholder,
  required = false,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        required={required}
        accept={accept}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  );
};
export default Input;
