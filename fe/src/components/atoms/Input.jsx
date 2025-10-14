const Input = ({
  type,
  name,
  value,
  onChange,
  id,
  placeholder = "",
  className,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className}`}
        readOnly={type === "id"}
      />
    </>
  );
};

export default Input;
