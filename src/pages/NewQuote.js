import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addQuote } from '../lib/api';
import usehttp from '../hooks/use-http';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuotes = function (props) {
  const { sendRequest, status } = usehttp(addQuote);

  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') history.push('/quotes');
  }, [status, history]);

  const addQuoteHandler = function (quote) {
    sendRequest(quote);
  };

  return (
    <QuoteForm
      onAddQuote={addQuoteHandler}
      isLoading={status === 'pending'}
    ></QuoteForm>
  );
};

export default NewQuotes;
