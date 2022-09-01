import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import { getAllQuotes } from '../lib/api';
import useHttp from '../hooks/use-http';

const AllQuotes = function (props) {
  const {
    sendRequest,
    data: loadedQuotes,
    error,
    status,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>;
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <p className="centered focus">{error}</p>;
  }

  if (status === 'completed' && (!loadedQuotes || !loadedQuotes.length)) {
    return <NoQuotesFound></NoQuotesFound>;
  }

  return <QuoteList quotes={loadedQuotes}></QuoteList>;
};

export default AllQuotes;
