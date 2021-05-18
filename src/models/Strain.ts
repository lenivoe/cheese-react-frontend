import FacticalProperty from './Property/FacticalProperty';
import StrainType from './StrainType';

export default interface Strain {
    id?: number; // nullable
    type: StrainType;
    name: string;
    collectionIndex: string;
    dateReceiving: string;
    source: string;
    creator?: string; // nullable
    dateAdded: string;
    obtainingMethod: string;

    properties: FacticalProperty[];
}
