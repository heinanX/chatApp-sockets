import { useEffect, useState } from "react";

// Interface på gif för att inte få fel på rad 47
interface GifData {
    images: {
        fixed_height_small: {
            url: string;
        };
    };
}

const GIF = () => {
    const [gif, setGif] = useState<GifData | null>(null);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_URL = "https://api.giphy.com/v1/gifs/trending";

    const url = `${API_URL}?api_key=${API_KEY}`;

    const randomIndex = Math.floor(Math.random() * 50); // <------ slumpar ett tal mellan 1 och 50

    useEffect(() => {
        // hämtar gifs från GIPHY

        const fetchGif = async () => {
            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error("hämtningen från GIPHY misslyckades");
                }

                const data = await res.json(); // <----- ger 50 st gifs

                console.log(data.data);

                setGif(data.data[randomIndex]); // sätter en slumpad gif

            } catch (error) {
                console.log(error);
            }
        };

        fetchGif();
    }, []);

    return <img className="gif" src={gif?.images.fixed_height_small.url} alt="Random GIF" />;
};

export default GIF;
