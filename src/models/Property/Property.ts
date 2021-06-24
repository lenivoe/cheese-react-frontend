import Group from '../Group';

export default interface Property<Param extends { groupId?: number }> {
    id: number;
    name: string;
    code?: string;
    isNote: boolean;
    groups?: Group<Param>[];

    /** @deprecated all parameters of the property are inside of groups now */
    ungrouped?: Param[];
}
