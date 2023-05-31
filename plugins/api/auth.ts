import { AUTH_TOKEN_KEY } from 'assets/ts/constants/auth';

interface iSignupBody {
    tariffId: string | undefined;
    phone: string;
    password: string;
    fullName: string;
    companyName: string;
}

interface IUserData {
    user: object;
    token: string;
}

interface ILoginBody {
    phone: string;
    password: string;
}

interface IPasswordBody {
    password: string;
}

export class AuthApi {
    private setUserToken(value: string) {
        const token = useCookie(AUTH_TOKEN_KEY, {
            path: '/',
            maxAge: 172800,
        });
        token.value = value;
    }

    async signup(body: iSignupBody) {
        try {
            const { data } = await useApi<IUserData>('/auth/signup', {
                method: 'POST',
                body,
                key: 'signup',
            });

            if (!data.value) {
                return false;
            }

            this.setUserToken(data.value.token);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async login(body: ILoginBody) {
        try {
            const { data } = await useApi<IUserData>('/auth/login', {
                method: 'POST',
                body,
                key: 'login',
            });

            if (!data.value) {
                return false;
            }

            this.setUserToken(data.value.token);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    password(body: IPasswordBody) {
        return useApi('/auth/password', {
            method: 'PATCH',
            body,
        });
    }
}
