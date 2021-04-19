export interface FormalProperty {
    propertyId: number;
    name: string;
    code?: string;
    isNote: boolean;

    ungroupedParameters?: FormalParameter[];
    groups?: FormalParameter[][];
}

export interface FormalParameter {
    formalParameterId: number;
    name: string;
    type: ParameterType;
}

export enum ParameterType {
    String,
    Number,
    Time,
    Date,
    Boolean,
    None,
}
