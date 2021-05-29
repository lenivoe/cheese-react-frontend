import * as Yup from 'yup';
import { SelectField } from './Fields';

const requiredMsg = 'обязательное поле';

const validationSchema = Yup.object({
    genus: Yup.object().shape({
        name: Yup.string()
            .notOneOf([SelectField.UNSELECTED_VALUE], requiredMsg)
            .required(requiredMsg),
    }),
    type: Yup.object()
        .shape({
            name: Yup.string()
                .notOneOf([SelectField.UNSELECTED_VALUE], requiredMsg)
                .required(requiredMsg),
        })
        .required(requiredMsg),
    name: Yup.string().required(requiredMsg),
    dateReceiving: Yup.date().required(requiredMsg),
    collectionIndex: Yup.string().required(requiredMsg),
    source: Yup.string().required(requiredMsg),
    obtainingMethod: Yup.string().required(requiredMsg),
    creator: Yup.string().notRequired(),
    dateAdded: Yup.date().required(requiredMsg),
});

export default validationSchema;
