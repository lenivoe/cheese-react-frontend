import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import StrainSavingFormValues from './StrainSavingFormValues';
import ParamField from './ParamField';
import PropertyItem from './PropertyItem';

export interface PropertiesListProps {
    propType: keyof StrainSavingFormValues['properties'];
}

export default function PropertiesList({ propType: type }: PropertiesListProps) {
    const { values } = useFormikContext<StrainSavingFormValues>();

    return (
        <FieldArray name={type}>
            {(propHelpers) =>
                values.properties[type].map((prop, propInd) => {
                    const ungroupedField = `properties.${type}[${propInd}].ungroupedParameters`;
                    const groupesField = `properties.${type}[${propInd}].groups`;

                    return (
                        <PropertyItem key={prop.propertyId} title={prop.propertyName}>
                            {prop.ungroupedParameters && (
                                <FieldArray name={ungroupedField}>
                                    {(ungroupedHelpers) =>
                                        prop.ungroupedParameters?.map(
                                            (param, paramInd) => (
                                                <ParamField
                                                    key={param.id ?? -paramInd - 1}
                                                    name={`${ungroupedField}[${paramInd}]`}
                                                    param={param}
                                                />
                                            )
                                        )
                                    }
                                </FieldArray>
                            )}

                            {prop.groups && (
                                <FieldArray name={groupesField}>
                                    {(groupesHelpers) =>
                                        prop.groups?.map((group, groupInd) => (
                                            <div key={group.groupId ?? -groupInd - 1}>
                                                {group.parameters.map(
                                                    (param, paramInd) => (
                                                        <ParamField
                                                            key={
                                                                param.id ?? -paramInd - 1
                                                            }
                                                            name={`${groupesField}[${groupInd}].parameters[${paramInd}]`}
                                                            param={param}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        ))
                                    }
                                </FieldArray>
                            )}
                        </PropertyItem>
                    );
                })
            }
        </FieldArray>
    );
}
