import Strain, { Genus, Property } from '../../../models/strain/strain';

type FormValues = Omit<Strain, 'properties' | 'type'> & {
    genus?: Genus;
    type?: Strain['type'];
    properties: { bio: Property[]; note: Property[] };
};

export default FormValues;
