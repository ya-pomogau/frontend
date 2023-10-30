import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { cbLink, isEmptyObj } from 'shared/libs/utils';
import { useLocation } from 'react-router-dom';

export const VKAuthPage = () => {
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //функция отправки кода на бэк и получения данных в ответ
    const loginVk = async (code: string | (string | null)[]) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/auth/login/vk`,
          {
            //путь необходимо будет поменять в зависимости от реализации на сервере
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const userData = await response.json(); // Извлекаем данные из ответа
          /*данные которые возвращаются при запросе access токена userData = {
                    "access_token" : "token",
                    "access_token_id" : "some_id",
                    "user_id" : user_id,
                    "phone": "",
                    "phone_validated": 1592423373,
                    "is_service": false,
                    "email": "test-email@mail.ru",
                    "source": 8,
                    "source_description": "Auth by exchange token on change password"
                }*/
          //TODO: ХЗ какие данные придут с сервера, поэтому не могу продумать полноценно логики. Накинула примерный план
          // если есть user в базе c vk_id === user_id, то этот пользователь уже есть
          // --- заправшиваем данные пользователя из базы, устанавливаем в хранилище, устанавливаем токен, перенаправляем на главную
          // иначе
          // --- берем данные, которые вернул ВК, перенаправляем на форму регистрации для подтверждения или корректировки данных пользователя,
        } else {
          // Если ответ от сервера не успешный
          setIsError(true); // Обрабатываем ошибку
        }
      } catch (error) {
        // Ошибка при выполнении запроса
        setIsError(true); // Обрабатываем ошибку
      }
      setIsLoading(false);
    };

    const queryObj = queryString.parse(location.search);

    // if (isError) window.location.href = cbLink;

    if (!isEmptyObj(queryObj) && queryObj.code) loginVk(queryObj.code);
  }, [location.search, isError, cbLink]);

  return (
    <>
      {isError && <div>ошибка </div>}
      {isLoading && <div>лоадер...</div>}
    </>
  );
};
