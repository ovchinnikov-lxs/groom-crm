import { IRolesItem } from '~/types/roles';

interface IMasterService {
    id: string;
    breeds: string[];
}

interface IStaffSave {
    fullName: string;
    phone: string;
    roles: Array<string>;
    preview: string | null
    description: string;
    salary: number;
    services: IMasterService[];
}

interface IStaffItem {
    id: string;
    roles: Array<IRolesItem>;
    fullName: string;
    phone: string;
    preview: string | null
    description: string;
    salary: number;
}

export type {
    IStaffSave,
    IStaffItem,
    IMasterService,
};
