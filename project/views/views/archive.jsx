import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Header } from "../../components/main_header";
import { Buttons } from "../../components/buttons";


export function Archive() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const data =
      JSON.parse(localStorage.getItem("archivedNews")) || [];

    setSavedArticles(data);
  };

  const removeArticle = (title) => {
    const updatedArticles = savedArticles.filter(
      (article) => article.title !== title
    );

    setSavedArticles(updatedArticles);

    localStorage.setItem(
      "archivedNews",
      JSON.stringify(updatedArticles)
    );
  };

  return (
    <>
      <Header />

      <div className="archive_page">
        <h1>Saved Articles</h1>

        {savedArticles.length === 0 && (
          <p>No saved articles yet.</p>
        )}

        {savedArticles.map((article, index) => {
          const image =
            article.media?.[0]?.["media-metadata"]?.[2]?.url;

          return (
            <ArchiveSwipeCard
              key={index}
              article={article}
              image={image}
              onRemove={removeArticle}
            />
          );
        })}
      </div>

      <Buttons />
    </>
  );
}

function ArchiveSwipeCard({
  article,
  image,
  onRemove,
}) {
  const [translateX, setTranslateX] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.deltaX < 0) {
        setTranslateX(eventData.deltaX);
      }
    },

    onSwipedLeft: () => {

      setTranslateX(-500);

      setTimeout(() => {
        onRemove(article.title);
      }, 200);
    },

    onSwipedRight: () => {
      setTranslateX(0);
    },

    onSwiped: () => {

      if (translateX > -100) {
        setTranslateX(0);
      }
    },

    trackMouse: true,
  });

  return (
    <div className="swipe_wrapper">
      <div className="remove_background">
        <div className="remove_icon">🗑️</div>
      </div>

      <div
        {...handlers}
        className="home_news_box"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: "transform 0.2s ease",
        }}
      >
        {image && (
          <img src={image} alt={article.title} />
        )}

        <div className="home_news_box_text">
          <h2>{article.title}</h2>
          <p>{article.abstract}</p>
        </div>
      </div>
    </div>
  );
}