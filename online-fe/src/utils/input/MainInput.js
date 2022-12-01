import "../../components/search/search.css";

export const MainInput = ({
  type,
  name,
  accept,
  handleChange,
  placeholder,
  required = false,
  style,
  className,
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
        style={style}
        className={"main-searchbar"}
      />
    </>
  );
};
export default MainInput;
