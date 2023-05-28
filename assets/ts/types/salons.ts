export interface ISalonSave {
    name: string | null;
    preview: string | null;
    openAt: string;
    closeAt: string;
    pricePerMonth: number | null;
    location: {
        lat: number | null;
        lng: number | null;
        address: string | null;
    }
}
export interface ISalonDetail extends ISalonSave {
    id: string;
    name: string;
    pricePerMonth: number;
    location: {
        lat: number;
        lng: number;
        address: string;
    }
}
