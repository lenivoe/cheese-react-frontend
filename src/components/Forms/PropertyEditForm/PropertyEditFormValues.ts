import FormalParameter from '../../../models/FormalParameter';
import FormalProperty from '../../../models/Property/FormalProperty';

interface Info<T extends { id?: any }> {
    saving?: Omit<T, 'id'>;
    removing: { id?: T['id'] };
    selected: { id?: T['id'] };
}

export default interface PropertyEditFormValues {
    propInfo: Info<FormalProperty>;
    paramInfo: Info<FormalParameter>;
    propList?: FormalProperty[];
    state: 'ADD_PROP' | 'EDIT_PROP' | 'ADD_PARAM' | 'EDIT_PARAM' | 'EDIT_GROUPS' | 'NONE';
}
