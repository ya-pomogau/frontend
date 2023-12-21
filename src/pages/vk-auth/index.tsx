import { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import { cbLink, isEmptyObj } from 'shared/libs/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TVKLoginRequestDto } from 'services/auth.types';
import {
  isNewSelector,
  isPendingSelector,
  userLoginThunk,
  userSelector,
  vkUserSelector,
} from 'services/system-slice';

export const VKAuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const vkUser = useAppSelector(vkUserSelector);
  const isLoading = useAppSelector(isPendingSelector);
  const isNew = useAppSelector(isNewSelector);
  const isError = useAppSelector((state) => state.error.isError);

  const [dto, setDto] = useState<TVKLoginRequestDto | null>(null);
  const isUserRequested = useRef<boolean>(false);
  useEffect(() => {
    const queryObj = queryString.parse(location.search) as TVKLoginRequestDto;
    if (
      !isEmptyObj(queryObj) &&
      queryObj.code &&
      queryObj.state &&
      !isUserRequested.current
    ) {
      queryObj.redirectUrl = cbLink;
      dispatch(userLoginThunk(queryObj));
      isUserRequested.current = true;
    }
  }, [location.search]);

  useEffect(() => {
    if (dto && dto.code && dto.redirectUrl) {
      dispatch(userLoginThunk(dto));
    }
  }, [dto, dispatch]);

  useEffect(() => {
    if (!user && !!vkUser) {
      navigate('/register');
    } else if (user) {
      navigate('/profile');
    }
  }, [user, vkUser, navigate]);
  //TODO: реализовать вывод ошибки при запросе и лоадер
  return (
    <>
      {isError && <div>ошибка </div>}
      {(isLoading || isNew) && <div>лоадер...</div>}
    </>
  );
};
