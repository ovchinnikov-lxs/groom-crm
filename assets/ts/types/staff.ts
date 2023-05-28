import { IRolesItem } from '~/assets/ts/types/roles';

export interface IStaffSave {
    fullName: string;
    phone: string;
    roles: Array<string>;
    preview: string | null
    description: string;
    salary: number;
}

export interface IStaffItem {
    id: string;
    roles: Array<IRolesItem>;
    fullName: string;
    phone: string;
    preview: string | null
    description: string;
    salary: number;
}
