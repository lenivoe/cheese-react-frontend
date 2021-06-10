import ParamDataType from './ParamDataType';
import FormalProperty from './Property/FormalProperty';

export default interface FormalParameter {
    id?: number;
    name: string;
    groupId?: number;
    parameterDataType: ParamDataType;
    property?: FormalProperty;
}
