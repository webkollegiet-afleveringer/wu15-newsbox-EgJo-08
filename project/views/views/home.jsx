import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { FetchTopStories } from "../../components/fetchnewskey";
import { Header } from "../../components/main_header";
import { Searchbar } from "../../components/searchbar";
import { Buttons } from "../../components/buttons";
import Intro from "../../components/intro";


export function Home() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  const [openCategories, setOpenCategories] = useState({
    health: true,
    sports: true,
    travel: true,
    europe: true,
    buisness: true,
  });

  const [enabledCategories, setEnabledCategories] = useState({
    health: true,
    sports: true,
    travel: true,
    buisness: true,
    europe: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("newsCategories");

    if (savedSettings) {
      setEnabledCategories({
        health: true,
        sports: true,
        travel: true,
        buisness: true,
        europe: true,
        ...JSON.parse(savedSettings),
      });
    }
  }, []);

   useEffect(() => {
    const getData = async () => {
      const data = await FetchTopStories();

      const categorizedArticles = data.map((article, index) => {
        const categories = [
          "europe",
          "health",
          "sports",
          "buisness",
          "travel",
        ];

        return {
          ...article,
          category: categories[index % categories.length],
        };
      });

      setArticles(categorizedArticles);
    };

    getData();
  }, []);



  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const saveToArchive = (article) => {
    const existing = JSON.parse(localStorage.getItem("archivedNews")) || [];

    const alreadySaved = existing.find(
      (item) => item.title === article.title
    );

    if (!alreadySaved) {
      localStorage.setItem(
        "archivedNews",
        JSON.stringify([...existing, article])
      );
    }
  };
const categories = [
    "europe",
    "health",
    "sports",
    "buisness",
    "travel",
  ];
 return (
    <>
    
      <Header />

      <Searchbar search={search} setSearch={setSearch} />

      {categories.map((category) => {
        if (!enabledCategories[category]) return null;

        const categoryArticles = articles.filter(
          (article) =>
            article.category === category &&
            article.title
              .toLowerCase()
              .includes(search.toLowerCase())
        );
 return (
          <div key={category} className="category_section">
            <div
              className="category_header"
              onClick={() => toggleCategory(category)}
            >
              <h2>{category.toUpperCase()}</h2>

              <span>
                {openCategories[category] ? "v" : ">"}
              </span>
            </div>
             {openCategories[category] &&
              categoryArticles.map((article, index) => {
                const image =
                  article.media?.[0]?.["media-metadata"]?.[2]?.url;

                return (
                  <SwipeArticle
                    key={index}
                    article={article}
                    image={image}
                    onSave={saveToArchive}
                  />
                );
              })}
          </div>
        );
      })}

      <Buttons />
    </>
  );
}

function SwipeArticle({ article, image, onSave }) {
  const [translateX, setTranslateX] = useState(0);
  const [saved, setSaved] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.deltaX < 0) {
        setTranslateX(eventData.deltaX);
      }
    },

     onSwipedLeft: () => {
      setTranslateX(-120);
      setSaved(true);
      onSave(article);

      setTimeout(() => {
        setTranslateX(0);
      }, 400);
    },

     onSwipedRight: () => {
      setTranslateX(0);
    },

    trackMouse: true,
  });

  return (
    <div className="swipe_wrapper">
      <div className="archive_background">
        <div className="bookmark_icon">
          🔖
        </div>
      </div>

      <div
        {...handlers}
        className={`home_news_box ${saved ? "saved" : ""}`}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >


      {image && <img src={image} alt={article.title} />}

        <div className="home_news_box_text">
          <h2>{article.title}</h2>
          <p>{article.abstract}</p>
        </div>
      </div>
    </div>
  );
}