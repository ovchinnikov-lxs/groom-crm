export interface IStaffItem {
    id: string;
    fullName: string;
    phone: string;
    roles: Array<string>;
    preview: string | null
    description: string;
    salary: number;
}

export interface IStaffSave {
    fullName: string;
    phone: string;
    roles: Array<string>;
    preview: string | null
    description: string;
    salary: number;
}
