// Buscador reutilizable. Recibe el texto desde la página y avisa cuando cambia.
// Sirve para filtrar listas como líneas o paradas sin repetir el mismo input.
function SearchBar({ id, label, placeholder, value, onChange }) {
  return (
    <div className="search-box">
      {/* Buscador reutilizable para líneas y paradas. El filtrado se hace en cada página. */}
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
