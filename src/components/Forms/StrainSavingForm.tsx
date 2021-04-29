import React from 'react';
import Strain, { FacticalParameter, Genus, StrainType } from '../../models/strain/strain';
import RequestError from '../../utils/request_error';
import { getAllGenera, getAllStrainTypes, getStrain } from '../../utils/data_fetch';
import PropertyItem from './Items/PropertyItem';
import SelectItem from './Items/SelectItem';
import TextItem from './Items/TextItem';
import DateItem from './Items/DateItem';

interface Props {
    strainId?: number;
}

interface State {
    requestError?: RequestError;
    isLoading: boolean;

    genusList: Genus[];
    typeList: StrainType[];

    genus?: Genus;
    type?: StrainType;
}

/**
 * add or edit strain
 */
export default class StrainSavingForm extends React.Component<Props, State> {
    private strain: Strain;

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            genusList: [],
            typeList: [],
        };

        this.strain = {
            name: '',
            collectionIndex: '',
            dateReceiving: '',
            source: '',
            dateAdded: '',
            obtainingMethod: '',
            properties: [],
        };
    }

    async componentDidMount() {
        const { strainId } = this.props;
        this.setState({ isLoading: true });

        try {
            const [genusList, typeList, strain] = await (strainId
                ? Promise.all([getAllGenera(), getAllStrainTypes(), getStrain(strainId)])
                : Promise.all([getAllGenera(), getAllStrainTypes()]));

            this.setState({ genusList, typeList });
            if (strain) {
                this.strain = strain;
                this.setState({ genus: strain.type?.genus });
                this.forceUpdate();
            }
        } catch (error) {
            this.setState({ requestError: error });
        }

        this.setState({ isLoading: false });
    }

    private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

    private onBaseFieldChanged = (value: string, fieldName: string) => {
        const strain: any = this.strain;
        const field = fieldName as keyof Strain;

        strain[field] = value;
        this.forceUpdate();
    };

    render() {
        const { isLoading, requestError } = this.state;

        if (isLoading) {
            return <p>Загрузка данных...</p>;
        }

        if (requestError) {
            return `Ошибка при получении данных: ${requestError.message}`;
        }

        const { genusList, typeList, genus } = this.state;
        const strain = this.strain;

        // return (
        //     <div>
        //         штамм
        //         <pre>{JSON.stringify(strain, null, 2)}</pre>
        //     </div>
        // );

        return (
            <div className='strain-adding'>
                <form
                    onSubmit={this.onSubmit}
                    className='strain-form form--position-block-center'
                >
                    <SelectItem
                        label='Род'
                        items={genusList.map((genus) => ({
                            text: genus.name,
                            value: genus.id.toString(),
                        }))}
                        activeItem={genus?.id.toString()}
                        onSelectChange={(sender) => {
                            const id = parseInt(sender.value, 10);
                            const genus = genusList.find((genus) => id === genus.id);

                            if (strain.type?.genus.id !== genus?.id) {
                                delete strain.type;
                            }
                            this.setState({ genus });
                            this.forceUpdate();
                        }}
                    />
                    <SelectItem
                        label='Вид'
                        items={typeList
                            .filter((type) => type.genus.id === genus?.id)
                            .map((type) => ({
                                text: type.name,
                                value: type.id.toString(),
                            }))}
                        activeItem={strain.type?.id.toString()}
                        onSelectChange={(sender) => {
                            const id = parseInt(sender.value, 10);
                            strain.type = typeList.find((type) => id === type.id);
                            this.forceUpdate();
                        }}
                    />
                    <TextItem
                        label='Исхродный индекс' // часть наименования
                        name='name'
                        value={strain.name}
                        onChange={this.onBaseFieldChanged}
                    />
                    <DateItem
                        label='Дата получения'
                        name='dateReceiving'
                        value={strain.dateReceiving}
                        onChange={this.onBaseFieldChanged}
                    />
                    <TextItem
                        label='Индекс штаммов' // каталожный индекс
                        name='collectionIndex'
                        value={strain.collectionIndex}
                        onChange={this.onBaseFieldChanged}
                    />
                    <TextItem
                        label='Происхождение' // происхождение
                        name='source'
                        value={strain.source}
                        onChange={this.onBaseFieldChanged}
                    />
                    <TextItem
                        label='Способ получения' // способ получения
                        name='obtainingMethod'
                        value={strain.obtainingMethod}
                        onChange={this.onBaseFieldChanged}
                    />

                    {/** properties */}

                    <div className='strain-form__properties properties'>
                        {strain.properties.map((property) => (
                            <PropertyItem
                                key={property.propertyId}
                                title={property.propertyName}
                            >
                                {property.ungroupedParameters?.map((param) => (
                                    <FieldFromParam
                                        key={param.id}
                                        param={param}
                                        onChange={(value, _) => {
                                            param.value = value;
                                            this.forceUpdate();
                                        }}
                                    />
                                ))}

                                {property.groups?.map((group) => (
                                    <div
                                        key={group.groupId}
                                        style={{ border: '1px dashed' }}
                                    >
                                        {group.parameters.map((param) => (
                                            <FieldFromParam
                                                key={param.id}
                                                param={param}
                                                onChange={(value, _) => {
                                                    param.value = value;
                                                    this.forceUpdate();
                                                }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </PropertyItem>
                        ))}
                    </div>
                </form>

                <div className='strain-adding__buttons form-buttons'>
                    <button
                        type='submit'
                        className='form-buttons__submit-button form-button submit-button'
                    >
                        Добавить
                    </button>
                    <button
                        type='button'
                        className='form-buttons__cancel-button form-button cancel-button'
                    >
                        Отмена
                    </button>
                </div>
            </div>
        );
    }
}

interface FieldFromParamProps {
    param: FacticalParameter;
    onChange: (value: string, changed: FacticalParameter) => void;
}

function FieldFromParam({ param, onChange }: FieldFromParamProps) {
    const props = {
        label: param.formalParameter.value,
        name: param.id.toString(),
        value: param.value,
        onChange: (value: string, fieldName?: string) => onChange(value, param),
    };
    if (param.formalParameter.parameterDataType.name === 'Date') {
        return <DateItem {...props} />;
    }
    return <TextItem {...props} />;
}
