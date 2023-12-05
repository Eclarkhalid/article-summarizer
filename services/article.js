// Import necessary libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const rapidApiKey = process.env.RAPID_API_KEY;

export const articleApi = createApi({
  reducePath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '8eb4ee3e26msh118e6042122bc7bp1444dajsn0abfae20b0bc');
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
    })
  })
});

export const { useLazyGetSummaryQuery } = articleApi;
