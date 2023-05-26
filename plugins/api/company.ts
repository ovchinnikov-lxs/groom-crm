interface IUpdateBody {
    name: string;
}

export class CompanyApi {
    getInfo() {
        return useApi('/company');
    }

    updateInfo(body: IUpdateBody) {
        return useApi('/company', {
            method: 'PATCH',
            body,
        });
    }
}
