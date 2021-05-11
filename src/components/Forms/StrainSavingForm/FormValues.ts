import { Genus, StrainType, Property } from '../../../models/strain/strain';

export default interface FormValues {
    genus: Genus | undefined;
    type: StrainType | undefined;
    name: string;
    dateReceiving: string;
    collectionIndex: string;
    source: string;
    obtainingMethod: string;
    properties: { bio: Property[]; note: Property[] };
}
