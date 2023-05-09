import React from 'react';
import {useSelector} from 'react-redux';
import {getIsError, getIsTopicError} from '../redux/selectors/news';
import {ErrorMessage} from '../components';

type Prop = {
  children: JSX.Element;
  props: any;
};

export const withErrorHandling =
  (Component: any) =>
  ({children, ...props}: Prop) => {
    const isError = useSelector(getIsError);
    const isTopicError = useSelector(getIsTopicError);

    return isError && isTopicError ? (
      <ErrorMessage />
    ) : (
      <Component {...props}>{children}</Component>
    );
  };
