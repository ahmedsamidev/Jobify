const FormRowSelect = ({
  label,
  optionsValues,
  selectDefaultValue = "",
  name,
  onchange,
  value,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={selectDefaultValue}
        onChange={onchange}
      >
        {Object.values(optionsValues).map((status) => (
          <option value={status} key={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormRowSelect;
