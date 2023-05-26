interface IUpdateBody {
    fullName: string | null;
    preview: string | null;
    description: string | null;
}

export class UserApi {
    getInfo() {
        return useApi('/user/me');
    }

    updateInfo(body: IUpdateBody) {
        return useApi('/user/me', {
            method: 'PATCH',
            body,
        });
    }
}
