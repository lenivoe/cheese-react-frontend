import Strain, { Genus, Property } from '../../../models/strain/strain';

type FormValues = Omit<Strain, 'properties'> & {
    genus: Genus | undefined;
    properties: { bio: Property[]; note: Property[] };
};

export default FormValues;
