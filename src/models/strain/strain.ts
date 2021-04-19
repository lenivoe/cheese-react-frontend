export default interface Strain {
    strainId?: number;
    typeId: number;
    name: string;
    collectionIndex: string;
    dateReceiving: Date;
    source: string;
    creator?: string;
    dateAdded: Date;
    obtainingMethod: string;

    properties: FacticalProperty[];
}

export interface FacticalProperty {
    propertyId: number;
    ungroupedParameters?: FacticalParameter[];
    groups?: FacticalParameter[][];
}

export interface FacticalParameter {
    facticalParameterId?: number;
    formalParameterId: number;
    value: string;
}
