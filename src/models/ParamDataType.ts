export default interface ParamDataType {
    id: number;
    name: DataType;
}

export type DataType = 'String' | 'Number' | 'Time' | 'Date' | 'Boolean' | 'Item';

export const DATE_FORMAT = 'YYYY-MM-DD';
