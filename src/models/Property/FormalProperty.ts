import FormalParameter from '../FormalParameter';
import Property from './Property';

// replace of "group" field type:
// Property<FormalParameter>[] | undefined ->  [Property<FormalParameter>] | undefined
type Base = Property<FormalParameter>;
type Group = NonNullable<Base['groups']>[number];
type FormalProperty = Omit<Base, 'groups'> & { groups?: [Group] };

export default FormalProperty;
