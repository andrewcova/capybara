import React from 'react';
import { EditTileFormProps } from '../types';

const EditLinkForm: React.FC<EditTileFormProps> = ({
  inputsData: {
    content: { url, title },
  },
  onInputChange,
}) => {
  return (
    <>
      <div className="overlay-form__group">
        <label className="overlay-form__label" htmlFor="overlay-edit-url">
          URL:
        </label>
        <input
          className="overlay-form__input overlay-form__input--text"
          name="url"
          type="text"
          id="overlay-edit-url"
          value={url || ''}
          onChange={onInputChange}
        />
      </div>
      <div className="overlay-form__group">
        <label className="overlay-form__label" htmlFor="overlay-edit-title">
          Link title:
        </label>
        <input
          className="overlay-form__input overlay-form__input--text"
          name="title"
          type="text"
          id="overlay-edit-title"
          value={title || ''}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default EditLinkForm;
