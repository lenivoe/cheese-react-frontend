import React from 'react';
import { Form } from 'formik';

interface ParamSavingBlockProps {
  id?: number;
  needEdit: boolean;
  visible?: boolean;
}

const ParamSavingBlock = ({
  id,
  needEdit,
  visible = true,
}: ParamSavingBlockProps) => {
  if (!visible) {
    return null;
  }

  const title = needEdit ? 'Изменить параметр' : 'Добавить параметр';
  const className = needEdit ? 'edit-parameter-form' : 'add-parameter-form';
  return (
    <div className={`form-block ${className}`}>
      <div className="form-block__title">{title}</div>
      <Form className="form form--flex">
        <div className="form__fields">
          <div className="form-block__item form__field">
            <label
              className="form-block__label form-label"
              htmlFor="parameter_name"
            >
              Наименование
            </label>
            <input
              className="form-block__input form-input"
              id="parameter_name"
              type="text"
              name="parameter_name"
            />
          </div>
          <div className="form-block__item form__field">
            <label
              className="form-block__label form-label"
              htmlFor="parameter_type"
            >
              Тип данных
            </label>
            <select
              className="form-block__input form-input"
              name="parameter_type"
              id="parameter_type"
            >
              <option value="1">число</option>
              <option value="2">строка</option>
              <option value="3">дата</option>
              <option value="3">время</option>
              <option value="3">список значений</option>
            </select>
          </div>
        </div>
        <button className="form-button" type="submit">
          Сохранить
        </button>
      </Form>
    </div>
  );
};

export default ParamSavingBlock;
