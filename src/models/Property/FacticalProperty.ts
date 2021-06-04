import FacticalParameter from '../FacticalParameter';
import Property from './Property';

// TODO like FormalProperty
// export default interface FacticalProperty {
//     id?: number;
//     name: string;
//     code?: string;
//     isNote: boolean;
//     ungrouped?: FacticalParameter[];
//     groups?: Group<FacticalParameter>[];
// }

export default interface FacticalProperty extends Property<FacticalParameter> {}
