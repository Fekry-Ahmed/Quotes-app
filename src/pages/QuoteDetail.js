import React, { useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';

const QuoteDetail = function (props) {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequset,
    error,
    status,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequset(quoteId);
  }, [sendRequset, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>;
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) return <p>Not Found</p>;

  return (
    <>
      <HighlightedQuote
        author={loadedQuote.author}
        text={loadedQuote.text}
      ></HighlightedQuote>

      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comment`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comment`}>
        <Comments></Comments>
      </Route>
    </>
  );
};

export default QuoteDetail;
