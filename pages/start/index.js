import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from '../../public/assets';
import { useLazyGetSummaryQuery } from "../services/article";
import { toast, Toaster } from 'react-hot-toast';
import Image from "next/image";

import { ScaleLoader } from 'react-spinners'
import Link from "next/link";


const Body = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState(null);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      toast.success('Summary Generated!!')
    }
  }

  const handleCopy = (copyText) => {
    navigator.clipboard.writeText(copyText);
    setCopied(copyText);
    setTimeout(() => setCopied(null), 4000);
  }

  const handleDelete = (index) => {
    const updatedArticles = [...allArticles];
    updatedArticles.splice(index, 1);
    setAllArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  }


  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-12 ">
        {/* Left Section */}
        <div className="md:block">
          <Link href={'/'} className="flex text-md items-center text-gray-500 my-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            Go back
          </Link>
          <h1 className="text-3xl font-bold mb-10">Enter Your Link Below</h1>
          <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
            <Image src={linkIcon} alt="link" className="absolute left-0 my-2 ml-3 w-5" />
            <input
              type="url"
              placeholder="Enter a URL for the article"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              required
              className="url_input peer"
            />
            <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </form>

          {/* Browser URL history
          <div className="flex flex-col gap-1 overflow-y-auto mt-6">
            {allArticles.map((item, index) => (
              <div key={`link-${index}`} className="link_card flex items-center gap-2" onClick={() => setArticle(item)} >
                <button onClick={() => handleDelete(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </button>
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <Image src={copied === item.url ? tick : copy} alt="copy" className="w-[40%] h-[40%] object-contain" />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
                <div onClick={() => handleCopy(item.summary)}>
                  {
                    copied === item.summary ?
                      <p className="flex-1 font-inter text-red-700 font-medium text-sm truncate">Copied</p> :
                      <p className="flex-1 font-inter text-blue-700 font-medium text-sm truncate">Copy Summary</p>
                  }
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center"> {/* Center align content */}

          {isFetching ? (
            <div className="flex justify-center items-center h-40"> {/* Center loading icon */}

              <ScaleLoader color="#36d7b7" /> <br />

            </div>
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Sorry, an error occurred!!
              <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span>
            </p>
          ) : (
            article.summary ? (
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0  text-left">Your Summary</h1>
                <div className="summary_box">
                  <p className="font-inter font-medium text-xl text-gray-700">{article.summary}</p>
                </div>
              </div>
            ) : (

              <div className=" h-52 rounded-lg bg-gray-200 w-full flex items-center justify-center p-3">
                <p className="text-center font-medium">Select a link to see its summary or paste a link to get its summary.</p>
              </div>

            )
          )}

          <div className="flex flex-col gap-1 overflow-y-auto mt-6 w-full">
          <h2 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0  text-left">History</h2>
            {allArticles.map((item, index) => (
              
              <div key={`link-${index}`} className="link_card flex items-center gap-2" onClick={() => setArticle(item)} >
                
                <button onClick={() => handleDelete(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </button>
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <Image src={copied === item.url ? tick : copy} alt="copy" className="w-[40%] h-[40%] object-contain" />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
                <div onClick={() => handleCopy(item.summary)}>
                  {
                    copied === item.summary ?
                      <p className="flex-1 font-inter text-red-700 font-medium text-sm truncate">Copied</p> :
                      <p className="flex-1 font-inter text-blue-700 font-medium text-sm truncate">Copy Summary</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div >
  );
};

export default Body;
