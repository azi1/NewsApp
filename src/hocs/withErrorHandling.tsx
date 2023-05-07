//@ts-nocheck
import React from 'react';
import {useSelector} from 'react-redux';
import {getIsError} from '../redux/selectors/news';
import {ErrorMessage} from '../components';

type Prop = {
  children: JSX.Element;
  props: any;
};

export const withErrorHandling =
  (Component: any) =>
  ({children, ...props}: Prop) => {
    const isError = useSelector(getIsError);

    return isError ? (
      <ErrorMessage route={props.route} />
    ) : (
      <Component {...props}>{children}</Component>
    );
  };
