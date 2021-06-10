import Genus from '../../../models/Genus';
import FacticalProperty from '../../../models/Property/FacticalProperty';
import Strain from '../../../models/Strain';

type StrainSavingFormValues = Omit<Strain, 'properties' | 'type'> & {
    genus?: Genus;
    type?: Strain['type'];
    properties: { bio: FacticalProperty[]; note: FacticalProperty[] };
    property: {selected:{id?: string}}
};

export default StrainSavingFormValues;
