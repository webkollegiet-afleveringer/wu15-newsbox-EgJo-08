import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Buttons } from "../../components/buttons";

export function Settings() {
  const [categories, setCategories] = useState({
    health: true,
    sports: true,
    travel: true,
    buisness: true,
    europe: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("newsCategories");

    if (savedSettings) {
      setCategories(JSON.parse(savedSettings));
    }
  }, []);

  const toggleCategory = (category) => {
    const updated = {
      ...categories,
      [category]: !categories[category],
    };

    setCategories(updated);

    localStorage.setItem(
      "newsCategories",
      JSON.stringify(updated)
    );
  };
  return (
    <>
    <div>
      <h1>Settings</h1>

      <label>
        <input
          type="checkbox"
          checked={categories.health}
          onChange={() => toggleCategory("health")}
        />
        Health
      </label>

      <label>
        <input
          type="checkbox"
          checked={categories.sports}
          onChange={() => toggleCategory("sports")}
        />
        Sports
      </label>

      <label>
        <input
          type="checkbox"
          checked={categories.travel}
          onChange={() => toggleCategory("travel")}
        />
        Travel
      </label>

       <label>
  <input
    type="checkbox"
    checked={categories.buisness}
    onChange={() => toggleCategory("buisness")}
  />
  Business
</label>

<label>
  <input
    type="checkbox"
    checked={categories.europe}
    onChange={() => toggleCategory("europe")}
  />
  Europe
</label>

    </div>
     <Buttons />
    </>
  );
}