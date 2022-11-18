export const Button = ({ handleSubmit, text = "Submit" }) => {
  return (
    <>
      <button onClick={handleSubmit}>{text}</button>
      {/* <input type="button" value={text} onSubmit={handleSubmit} /> */}
    </>
  );
};
export default Button;
