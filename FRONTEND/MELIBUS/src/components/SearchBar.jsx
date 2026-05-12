function SearchBar({ id, label, placeholder, value, onChange }) {
  return (
    <div className="search-box">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar