import FormalParameter from '../FormalParameter';
import Property from './Property';

export default interface FormalProperty extends Property<FormalParameter> {
    ungrouped?: FormalParameter[];
}
