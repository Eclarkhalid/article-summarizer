import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';



export default function Hero() {

  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);
  return <>
    <section>
      <div className="custom-screen pt-28 text-gray-600">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
            Summarize a Blog Post  <div className="text-teal-600">
              in seconds
            </div>
          </h1>
          <p className="max-w-xl mx-auto text-xl">
            Simplify your reading with Xmize, an open-source article summarizer that transforms lengthy blog articles into clear and concise summaries.
          </p>
          <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
            <Link
              href="/start"
              className="text-white bg-teal-600 hover:bg-teal-800 active:bg-teal-900 p-4 rounded-lg"
            >
              Summarize A Blog
            </Link>

          </div>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 pt-10">
            {/* {heroImages.map((image, idx) => (
              <Image
                key={idx}
                alt="image"
                src={image}
                width={500}
                height={500}
                className="rounded-lg"
              />
            ))} */}
          </div>
        </div>
      </div>
    </section>

    <hr class=" h-px border-0 max-w-7xl mx-auto bg-gray-300" />

    <section className='max-w-4xl mx-auto mt-20'>
      {allArticles.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          Your generated summaries will appear here
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {allArticles.map((item, index) => (
              <div key={`article-${index}`} className=" h-44 rounded-lg border shadow-md">
                <div className="link_card flex items-center gap-2 p-3">
                  <div className="">
                    <Link href={item.url} target='_blank' className="flex-1 font-satoshi text-blue-700 font-medium text-sm line-clamp-2">{item.url}</Link>
                  </div>
                </div>
                <div className="p-3">
                  <p className="flex-1 font-satoshi text-slate-700 font-medium text-md line-clamp-4">{item.summary}</p>
                </div>
              </div>
            ))}

          </div><p className="text-center text-gray-500 mt-12 cursor-not-allowed">
            Create an account to save your summaries
          </p>
        </>
      )}
    </section>


  </>
}