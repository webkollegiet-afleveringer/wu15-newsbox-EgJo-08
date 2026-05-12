import { data } from "react-router-dom";
 
export const FetchTopStories = async () => {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=n7GR6ObTtb3lLlTwH7lgTrqm0Go78PgP7qrcAaEctYfOzBmx`
    );
 
    if (!response.ok) {
      throw new Error(`NYT API returned status ${response.status}`);
    }
 
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("NYT API error:", error);
    return [];
  }
};
