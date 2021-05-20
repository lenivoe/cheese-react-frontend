import Group from '../Group';

export default interface Property<Param extends { groupId?: number }> {
    id: number;
    name: string;
    code?: string;
    isNote: boolean;
    ungrouped?: Param[];
    groups?: Group<Param>[];
}
