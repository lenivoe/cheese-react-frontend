import Group from '../Group';

export default interface Property<Param extends { groupId?: number }> {
    propertyId?: number;
    propertyName: string;
    isNote: boolean;
    groups?: Group<Param>[];
}
