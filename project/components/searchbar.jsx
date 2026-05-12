export function Searchbar({ search, setSearch }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search news"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}