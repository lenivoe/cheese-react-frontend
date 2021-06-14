import { UsingParam, UsingProperty } from '../../../store/property/propertySlice';

interface Info<T extends { id?: any }> {
    saving?: Omit<T, 'id'>;
    removing: { id?: T['id'] };
    selected: { id?: T['id'] };
}

export default interface PropertyEditFormValues {
    propInfo: Info<UsingParam>;
    paramInfo: Info<UsingParam>;
    propList?: UsingProperty[];
    state: 'ADD_PROP' | 'EDIT_PROP' | 'ADD_PARAM' | 'EDIT_PARAM' | 'NONE';
}
