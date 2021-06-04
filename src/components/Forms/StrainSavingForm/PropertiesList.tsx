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
                values.properties[type].map((prop, propIdx) => {
                    const ungroupedField = `properties.${type}[${propIdx}].ungrouped`;
                    const groupesField = `properties.${type}[${propIdx}].groups`;

                    return (
                        <PropertyItem key={prop.id} title={prop.name}>
                            {prop.ungrouped && (
                                <FieldArray name={ungroupedField}>
                                    {(ungroupedHelpers) =>
                                        prop.ungrouped?.map(
                                            (param, paramIdx) => (
                                                <ParamField
                                                    key={param.id ?? -paramIdx - 1}
                                                    name={`${ungroupedField}[${paramIdx}]`}
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
                                        prop.groups?.map((group, groupIdx) => (
                                            <div key={group.groupId ?? -groupIdx - 1}>
                                                {group.parameters.map(
                                                    (param, paramIdx) => (
                                                        <ParamField
                                                            key={
                                                                param.id ?? -paramIdx - 1
                                                            }
                                                            name={`${groupesField}[${groupIdx}].parameters[${paramIdx}]`}
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
