export interface KakaoTokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
  id_token?: string;
}

export interface KakaoProfileResponse {
  id: number;
  kakao_account: {
    profile: {
      nickname: string;
      profile_image_url: string;
    };
    name: string;
    email: string;
  };
}

export class KakaoProvider {
  constructor(
    protected clientId: string,
    protected secret: string,
    protected redirectUri: string,
  ) {
    if (!clientId || !secret || !redirectUri) {
      throw new Error('clientId, secret, redirectUri are required');
    }
    this.clientId = clientId;
    this.secret = secret;
    this.redirectUri = redirectUri;
  }

  /**
   * Kakao OAuth2 URL
   * @returns Kakao OAuth2 URL
   */
  getSignInUrl() {
    return `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
    })}`;
  }

  /**
   * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
   * @param code
   * @returns TokenResponse
   */
  fetchToken(code: string): Promise<KakaoTokenResponse> {
    return fetch(
      `https://kauth.kakao.com/oauth/token?${new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        client_secret: this.secret,
      })}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    ).then((res) => {
      console.log('res', res);
      return res.json();
    });
  }

  fetchProfile(token: string): Promise<KakaoProfileResponse> {
    return fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }
}
