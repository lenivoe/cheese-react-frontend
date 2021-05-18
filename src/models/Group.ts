export default interface Group<Param extends { groupId?: number }> {
    groupId?: number;
    parameters: Param[];
}
