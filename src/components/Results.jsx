import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "../contexts/Provider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=60`);
      }
    }
    // eslint-disable-next-line
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results?.results?.map(({ link, title, description }, index) => (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              key={index}
              className="md:w-2/5 w-full bg-blue-200 rounded bg-opacity-25 py-2 px-4 hover:bg-opacity-50 hover:shadow-lg
              dark:bg-gray-700 dark:hover:shadow-lg"
            >
              <p className="text-sm">
                {link.length > 30 ? link.substring(0, 30) : link}
              </p>
              <p className="text-xl hover:underline dark:text-blue-400 text-blue-700 ">
                {title}
              </p>
              <p className="text-xs pt-2">
                {description.length > 100
                  ? description.substring(0, 100) + "...read more"
                  : description}
              </p>
            </a>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results?.map(
            ({ image, link: { href, title } }, index) => (
              <a href={href} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
                <img src={image?.src} alt={title} loading="lazy" />
                <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
              </a>
            )
          )}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap justify-between items-center">
          {results?.results?.map((video, index) => (
            <div key={index} className="p-2">
              <ReactPlayer
                url={video.additional_links?.[0].href}
                controls
                width="355px"
                height="200px"
              />
            </div>
          ))}
        </div>
      );
      case '/news':
        return (
          <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
            {results?.map(({ id, link, source, title, published }) => (
              <div key={id} className="md:w-2/5 w-full bg-blue-200 rounded bg-opacity-25 py-2 px-4 hover:bg-opacity-50 hover:shadow-lg
              dark:bg-gray-700 dark:hover:shadow-lg">
                <a href={link} target="_blank" rel="noreferrer " className="hover:underline ">
                  <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
                </a>
                <div className="flex gap-4 justify-between">
                  <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {source?.title}
                  </a>
                  <p className="text-xs m-1" >{published.substring(0, 16)}</p>
                </div>
              </div>
            ))}
          </div>
        );
    default:
      return "ERROR";
  }
};
