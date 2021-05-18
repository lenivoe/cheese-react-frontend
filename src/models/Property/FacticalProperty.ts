import FacticalParameter from '../FacticalParameter';
import Property from './Property';

export default interface FacticalProperty extends Property<FacticalParameter> {
    ungroupedParameters?: FacticalParameter[];
}
