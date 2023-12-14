import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const queryObj = queryString.parse(location.search) as TVKLoginRequestDto;

    if (!isEmptyObj(queryObj) && queryObj.code && queryObj.state) {
      queryObj.redirectUrl = cbLink;
      setDto(queryObj);
    }
    console.dir(queryObj);
  }, [location.search]);

  useEffect(() => {
    if (dto && dto.code && dto.redirectUrl) {
      dispatch(userLoginThunk(dto));
    }
  }, [dto, dispatch]);

  useEffect(() => {
    console.dir(vkUser); //TODO: потом удалить
    if (!user) {
      navigate('/register');
    }
  }, [user, vkUser, navigate]);

  useEffect(() => {
    console.dir(user); //TODO: потом удалить
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return (
    <>
      {isError && <div>ошибка </div>}
      {(isLoading || isNew) && <div>лоадер...</div>}
    </>
  );
};
