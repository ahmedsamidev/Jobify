const FormRow = ({ labelText, defaultValue, type, name, onchange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        onChange={onchange}
        defaultValue={defaultValue || ""}
        className="form-input"
        name={name}
        type={type}
        id={name}
        required
      />
    </div>
  );
};
export default FormRow;
