import React, { useEffect, useState } from 'react';
import PropertyEditBlock, { EditMode } from './Blocks/PropertyEditBlock';
import {
  MenuKey,
  setActiveMenuItemByKey,
  setTitleByActiveItem,
} from '../../../store/formFrame/formFrameSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  deleteProperty,
  selectPropertyState,
  uploadProperty,
} from '../../../store/property/propertySlice';
import FormErrorMessage from '../Items/FormErrorMessage';
import { useCallback } from 'react';
import PropertySavingBlock from './Blocks/PropertySavingBlock';
import FormalProperty from '../../../models/Property/FormalProperty';
import ParamSavingBlock from './Blocks/ParamSavingBlock';

export default function PropertyEditForm() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveMenuItemByKey(MenuKey.PROPERTY_EDIT));
    dispatch(setTitleByActiveItem());
  });

  const { status, error, propList } = useAppSelector(selectPropertyState);

  const [mode, onModeChange] = useState<EditMode>('NONE');
  const [selectedPropId, setSelectedPropId] = useState<number>();
  const [selectedParamId, setSelectedParamId] = useState<number>();

  const onPropSelect = useCallback(
    (id: number) => {
      setSelectedPropId(id);
      setSelectedParamId(undefined);
    },
    [setSelectedPropId, setSelectedParamId]
  );

  const onPropDelete = useCallback(
    (id: number) => {
      console.log('delete prop', id);
      dispatch(deleteProperty(id));
    },
    [dispatch]
  );

  const onParamDelete = useCallback(
    (id: number) => {
      const findProp = (id: number) => {
        for (const prop of propList) {
          for (const param of prop.groups?.[0].parameters ?? []) {
            if (param.id === id) {
              return prop;
            }
          }
        }
      };
      const prop = findProp(id);
      const idx = (prop?.groups?.[0].parameters ?? []).findIndex(
        (param) => param.id === id
      );
      if (idx >= 0 && prop?.groups?.[0].parameters) {
        const parameters = prop.groups[0].parameters.filter(
          (param, i) => i !== idx
        );

        const updatedProp: FormalProperty = {
          ...prop,
          groups: [
            {
              ...prop.groups[0],
              parameters,
            },
          ],
        };

        dispatch(uploadProperty(updatedProp));
      }
    },
    [dispatch, propList]
  );

  return (
    <div>
      <FormErrorMessage loading={status === 'loading'} error={error} />

      <div className="property-edit">
        <PropertyEditBlock
          selectedPropId={selectedPropId}
          onPropSelect={onPropSelect}
          onPropDelete={onPropDelete}
          selectedParamId={selectedParamId}
          onParamSelect={setSelectedParamId}
          onParamDelete={onParamDelete}
          mode={mode}
          onModeChange={onModeChange}
        />

        <div className="property-edit__form-block">
          <PropertySavingBlock
            propertyId={selectedPropId}
            needEdit={mode === 'EDIT_PROP'}
            visible={mode === 'ADD_PROP' || mode === 'EDIT_PROP'}
          />
          <ParamSavingBlock
            needEdit={mode === 'EDIT_PARAM'}
            visible={mode === 'ADD_PARAM' || mode === 'EDIT_PARAM'}
          />
        </div>
      </div>
    </div>
  );
}
