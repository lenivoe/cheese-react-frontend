import ParamDataType from './ParamDataType';

export default interface FormalParameter {
    id?: number;
    groupId?: number;
    parameterDataType: ParamDataType;
    name: string;
}
