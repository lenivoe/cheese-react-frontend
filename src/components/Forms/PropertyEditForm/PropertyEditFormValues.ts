import FormalParameter from '../../../models/FormalParameter';
import Property from '../../../models/Property/Property';

interface Info<T extends { id?: any }> {
    saving?: Omit<T, 'id'>;
    removing: { id?: T['id'] };
    selected: { id?: T['id'] };
}

type Param = FormalParameter & { isUsing: boolean };
type Prop = Property<Param> & { isUsing: boolean };

export default interface PropertyEditFormValues {
    propInfo: Info<Param>;
    paramInfo: Info<Param>;
    propList?: Prop[];
    state: 'ADD_PROP' | 'EDIT_PROP' | 'ADD_PARAM' | 'EDIT_PARAM' | 'NONE';
}
