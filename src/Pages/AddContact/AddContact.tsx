/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button, Input, Toast } from '../../Components';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useAddContact } from '../../Custom-Hooks/graphql-mutation/useAddContact';
import {
  DEFAULT_ERROR,
  DUPLICATE_PHONE_CLIENT_ERROR,
  DUPLICATE_PHONE_SERVER_ERROR,
  REGEX,
  TOAST_INITIAL_STATE,
  inputErrMsg,
} from '../../Common/Constants';
import { IContact } from '../../Common/module';
import { getIndexToInsertContact } from '../../Common/Utils';

const FormStyles = css`
  margin: 4rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-inputs-container {
    margin: 2rem 0;
  }

  .form-inputs {
    border: 1px solid var(--grey);
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-btns {
    display: flex;
    border: 1px solid var(--blue);
    justify-content: space-around;
    align-items: center;
    position: relative;
    .form-submit-btn,
    .form-cancel-btn {
      color: var(--blue);
      flex: 1;
      min-height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .form-submit-btn:hover,
    .form-cancel-btn:hover {
      background-color: var(--blue2);
    }
  }

  .form-error {
    border-color: var(--red);
  }

  .form-error-msg {
    font-size: small;
    color: var(--red);
  }
`;

const formErrorsInitialState = {
  firstName: '',
  lastName: '',
  phones: '',
  submit: '',
};

interface IAddContact {
  contactsList: IContact[];
  setContactsList: Function;
}

const AddContact: React.FC<IAddContact> = ({
  contactsList,
  setContactsList,
}) => {
  const { executeAddContact, loading, data } = useAddContact();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formErrors, setFormError] = useState(formErrorsInitialState);
  const [phones, setPhones] = useState<{ number: string }[]>([{ number: '' }]);
  const [toast, setToast] = useState(TOAST_INITIAL_STATE);

  const onAddClickHandler = () => {
    setPhones((prev: any) => [...prev, { number: '' }]);
  };

  const onSuffixHandler = (index: number) => {
    setPhones((prev: any) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const formValidation = () => {
    let isFormValid = true;
    if (firstName === '' || !REGEX.NAME.test(firstName)) {
      setFormError((prev: any) => ({
        ...prev,
        firstName: inputErrMsg('first name'),
      }));
      isFormValid = false;
    }
    if (lastName === '' || !REGEX.NAME.test(lastName)) {
      setFormError((prev: any) => ({
        ...prev,
        lastName: inputErrMsg('last name'),
      }));
      isFormValid = false;
    }
    if (!phones[0]?.number) {
      setFormError((prev: any) => ({
        ...prev,
        phones: inputErrMsg('phone number'),
      }));
      isFormValid = false;
    }
    const phoneValid = phones.reduce(
      (acc: any, curr: any) => acc && REGEX.MOBILE.test(curr.number),
      true
    );

    if (!phoneValid) {
      setFormError((prev: any) => ({
        ...prev,
        submit: 'One of the phone numbers is invalid',
      }));
      isFormValid = false;
    }

    const favContacts = localStorage.getItem('favContacts');
    let parsedFavContacts = [];
    if (favContacts) parsedFavContacts = JSON.parse(favContacts);

    if (
      contactsList.some(
        (contact) =>
          contact.first_name.toLowerCase() === firstName.toLowerCase() &&
          contact.last_name.toLowerCase() === lastName.toLowerCase()
      ) ||
      parsedFavContacts.some(
        (contact: any) =>
          contact.first_name.toLowerCase() === firstName.toLowerCase() &&
          contact.last_name.toLowerCase() === lastName.toLowerCase()
      )
    ) {
      setFormError((prev: any) => ({
        ...prev,
        submit: 'This contact name already present',
      }));
      isFormValid = false;
    }
    return isFormValid;
  };

  const onsubmitHandler = async (e: any) => {
    e.preventDefault();
    setFormError(formErrorsInitialState);
    if (!formValidation()) {
      return;
    }
    const phonesToAdd = phones.filter((phone: any) => phone.number);
    const res = await executeAddContact(firstName, lastName, phonesToAdd);

    if (res.error) {
      return setFormError((prev: any) => ({
        ...prev,
        submit:
          res.error?.message === DUPLICATE_PHONE_SERVER_ERROR
            ? DUPLICATE_PHONE_CLIENT_ERROR
            : DEFAULT_ERROR,
      }));
    }

    const newContact = res.data?.data.insert_contact.returning[0];
    const indexToInsert = getIndexToInsertContact(contactsList, newContact);
    setContactsList((prevList: any) => [
      ...prevList.slice(0, indexToInsert),
      newContact,
      ...prevList.slice(indexToInsert),
    ]);

    setToast({
      message: 'Contact added successfully',
      open: true,
      type: 'success',
    });

    setFirstName('');
    setLastName('');
    setPhones([{ number: '' }]);
  };

  const onChangeHandler = (e: any, idx: number) => {
    const { value } = e.target;
    const updatedPhones = [...phones];
    updatedPhones[idx].number = value;
    setPhones(updatedPhones);
  };

  return (
    <div css={FormStyles} onSubmit={onsubmitHandler}>
      <form>
        <h2 className='form-header'>Add Contact</h2>
        <div className='form-inputs-container'>
          <div
            className={`form-inputs ${formErrors?.submit ? 'form-error' : ''}`}
          >
            <Input
              label='First Name'
              value={firstName}
              onChange={(e) => !loading && setFirstName(e.target.value)}
              disabled={loading}
              error={formErrors.firstName}
              onFocus={() =>
                setFormError((prev: any) => ({
                  ...prev,
                  firstName: '',
                  submit: '',
                }))
              }
              borderbottom
            />
            <Input
              label='Last Name'
              value={lastName}
              onChange={(e: any) => !loading && setLastName(e.target.value)}
              disabled={loading}
              error={formErrors.lastName}
              onFocus={() =>
                setFormError((prev: any) => ({
                  ...prev,
                  lastName: '',
                  submit: '',
                }))
              }
              borderbottom
            />
            <Input
              label='Enter number 1'
              value={phones[0].number}
              onChange={(e: any) => onChangeHandler(e, 0)}
              error={formErrors.phones}
              onFocus={() =>
                setFormError((prev: any) => ({
                  ...prev,
                  phones: '',
                  submit: '',
                }))
              }
              disabled={loading}
              borderbottom
            />
            {phones.slice(1).map((item: any, index: number) => (
              <Input
                key={index}
                label={`Enter number ${index + 2}`}
                suffix='-'
                value={phones[index + 1].number}
                onSuffix={() => onSuffixHandler(index + 1)}
                onChange={(e: any) => onChangeHandler(e, index + 1)}
                onFocus={() =>
                  setFormError((prev: any) => ({
                    ...prev,
                    submit: '',
                  }))
                }
                disabled={loading}
                borderbottom
              />
            ))}
            <Button type='link' disabled={loading} onClick={onAddClickHandler}>
              <span style={{ marginRight: '1rem' }}>+</span>Add phone number
            </Button>
          </div>
          {formErrors?.submit && (
            <div className='form-error-msg'>{formErrors?.submit}</div>
          )}
        </div>
        <div className='form-btns'>
          <Link to='/' className='form-cancel-btn'>
            Cancel
          </Link>
          <Button
            type='link'
            classname='form-submit-btn'
            htmlType='submit'
            loading={loading}
          >
            Save
          </Button>
        </div>
      </form>
      {toast.open && (
        <Toast
          message={toast.message}
          onClose={() => setToast(TOAST_INITIAL_STATE)}
        />
      )}
    </div>
  );
};

export default AddContact;
