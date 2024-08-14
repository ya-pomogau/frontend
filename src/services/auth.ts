import {
  ErrorDto,
  ResponseDto,
  TAuthRoutes,
  TCreateUserDto,
  TAdminLoginDto,
  TNewUserResponseDto,
  TVKLoginRequestDto,
  TVKLoginResponseDto,
  TMockLoginRequestDto,
  TMockLoginResponseDto,
  TypedResponse,
} from './auth.types';
import { API_URL, AUTH_ROUTES, DEFAULT_HEADERS } from '../config/api-config';
import { TUser } from 'entities/user/types';

class Auth {
  constructor(
    private readonly baseUrl: string,
    private readonly routes: TAuthRoutes,
    private readonly headers: Record<string, string>
  ) {}

  private static _checkResponse(
    res: TypedResponse<ResponseDto>
  ): Promise<ResponseDto> {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((error) => {
      error.httpStatusCode = res.status;
      return Promise.reject(error as ErrorDto);
    });
  }

  public vkLogin(dto: TVKLoginRequestDto) {
    const fetchOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(dto),
    };
    return fetch(`${this.baseUrl}${this.routes.userLogin}`, fetchOptions).then(
      Auth._checkResponse
    ) as Promise<TVKLoginResponseDto>;
  }

  public createNewUser(dto: TCreateUserDto) {
    const fetchOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(dto),
    };
    return fetch(
      `${this.baseUrl}${this.routes.userRegister}`,
      fetchOptions
    ).then(Auth._checkResponse) as Promise<TNewUserResponseDto>;
  }

  public adminLogin(dto: TAdminLoginDto) {
    const fetchOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(dto),
    };
    return fetch(`${this.baseUrl}${this.routes.adminLogin}`, fetchOptions).then(
      Auth._checkResponse
    ) as Promise<TNewUserResponseDto>;
  }

  public checkToken(token: string) {
    const fetchOptions = {
      method: 'GET',
      headers: { ...this.headers, Authorization: `Bearer ${token}` },
    };
    return fetch(`${this.baseUrl}${this.routes.checkToken}`, fetchOptions).then(
      Auth._checkResponse
    ) as Promise<TUser>;
  }

  public mockLogin(dto: TMockLoginRequestDto) {
    const fetchOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(dto),
    };
    return fetch(`${this.baseUrl}${this.routes.mockLogin}`, fetchOptions)
      .then(Auth._checkResponse)
      .then((response) => response as TMockLoginResponseDto);
  }
}

export const authApi = new Auth(
  API_URL ?? 'http://localhost:3001',
  AUTH_ROUTES,
  DEFAULT_HEADERS
);
