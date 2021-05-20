import FacticalParameter from '../FacticalParameter';
import Group from '../Group';

// TODO like FormalProperty
export default interface FacticalProperty {
    propertyId?: number; // TODO: refactoring
    propertyName: string; // TODO: refactoring
    code?: string;
    isNote: boolean;
    ungroupedParameters?: FacticalParameter[]; // TODO: refactoring
    groups?: Group<FacticalParameter>[];
}
