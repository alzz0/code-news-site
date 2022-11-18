export const Input = ({
  type,
  name,
  accept,
  handleChange,
  required = "false",
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        required={required}
        accept={accept}
        onChange={handleChange}
      />
    </>
  );
};
export default Input;
