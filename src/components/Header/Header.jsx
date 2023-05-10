import "./styles.css";

const Header = ({ search, setSearch }) => {
  const onChange = (value) => {
    setSearch(value);
  };

  return (
    <header className="header">
      <h1 className="title">Live User Filter</h1>
      <h2 className="subtitle">Search by name or location</h2>
      <input
        value={search ?? ""}
        onChange={(event) => onChange(event.target.value)}
        name="search"
        className="searchBar"
        placeholder="Search"
        type="text"
      />
    </header>
  );
};

export { Header };
