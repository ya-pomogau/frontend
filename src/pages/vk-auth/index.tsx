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
    console.log('first effect:');
    console.dir(dto);
    console.log(
      `Is first effect should enter 'if' : ${
        !isEmptyObj(queryObj) && !!queryObj.code && !!queryObj.state
      }`
    );
    if (
      !isEmptyObj(queryObj) &&
      queryObj.code &&
      queryObj.state &&
      !isUserRequested.current
    ) {
      console.log('location:');
      console.dir(location);
      console.log(`location.search: '${location.search}'.\nqueryObj`);
      console.dir(queryObj);
      queryObj.redirectUrl = cbLink;
      dispatch(userLoginThunk(queryObj));
      isUserRequested.current = true;
    }
  }, [location.search]);

  useEffect(() => {
    console.log('second effect:');
    console.dir(dto);
    if (dto && dto.code && dto.redirectUrl) {
      console.log('second effect dispatch:');
      console.dir(dto);
      dispatch(userLoginThunk(dto));
    }
  }, [dto, dispatch]);

  useEffect(() => {
    console.dir(vkUser); //TODO: потом удалить
    if (!user && !!vkUser) {
      console.log('!user && !!vkUser');
      navigate('/register');
    } else if (user) {
      console.log('!!user');
      console.log('will navigate to profile');
      navigate('/profile');
    }
  }, [user, vkUser, navigate]);

  return (
    <>
      {isError && <div>ошибка </div>}
      {(isLoading || isNew) && <div>лоадер...</div>}
    </>
  );
};
