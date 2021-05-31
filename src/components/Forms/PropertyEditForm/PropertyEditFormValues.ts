import FormalParameter from "../../../models/FormalParameter";
import FormalProperty from "../../../models/Property/FormalProperty";

export default interface PropertyEditFormValues {
    property?: FormalProperty;
    parameter?: FormalParameter;
    propertyList?: FormalProperty[];
    state: 'ADD_PROP' | 'EDIT_PROP' | 'ADD_PARAM' | 'EDIT_PARAM' | 'EDIT_GROUPS' | 'NONE'
}
