import { createContext, useState, useContext } from "react";

const ResultContext = createContext();
const baseURL = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSeacrhTerm] = useState('youtube');

    const getResults = async (searchTerm) => {

        setIsLoading(true);
        const response = await fetch(`${baseURL}${searchTerm}`, {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "google-search3.p.rapidapi.com",
                'x-rapidapi-key': '452d4108abmsh1bd4c970b9699f9p1853dajsnf11960f49962'
            }
        });
        const data = await response.json();
        
        if(searchTerm.includes('/news'))
        {
            setResults(data.entries)
        }
        else{
            setResults(data);
        }

        setIsLoading(false);
    }
    return (
        <ResultContext.Provider value={{ getResults, results, isLoading, setSeacrhTerm, searchTerm }}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext);