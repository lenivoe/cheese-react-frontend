export default interface Strain {
    id?: number; // nullable
    type?: StrainType;
    name: string;
    collectionIndex: string;
    dateReceiving: string;
    source: string;
    creator?: string; // nullable
    dateAdded: string;
    obtainingMethod: string;

    properties: Property[];
}

export interface StrainType {
    id: number;
    name: string;
    genus: Genus;
}
export interface Genus {
    id: number;
    name: string;
}

interface Property {
    propertyId?: number;
    propertyName: string;
    isNote: boolean;
    ungroupedParameters?: FacticalParameter[];
    groups?: Group[];
}

interface Group {
    groupId?: number;
    parameters: FacticalParameter[];
}

export interface FacticalParameter {
    formalParameter: FormalParameter;
    groupId?: number;
    id?: number;
    value: string;
}

interface FormalParameter {
    id?: number;
    parameterDataType: ParamDataType;
    name: string;
}

interface ParamDataType {
    id: number;
    name: DataType;
}

type DataType = 'String' | 'Number' | 'Time' | 'Date' | 'Boolean' | 'None';
