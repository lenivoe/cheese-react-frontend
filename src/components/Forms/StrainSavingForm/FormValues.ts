import Genus from '../../../models/Genus';
import FacticalProperty from '../../../models/Property/FacticalProperty';
import Strain from '../../../models/Strain';

type FormValues = Omit<Strain, 'properties' | 'type'> & {
    genus?: Genus;
    type?: Strain['type'];
    properties: { bio: FacticalProperty[]; note: FacticalProperty[] };
};

export default FormValues;
