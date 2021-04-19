export interface Genus {
    genusId: number;
    name: string;
}

export interface Type {
    typeId: number;
    name: string;
    genusId: number;
}
