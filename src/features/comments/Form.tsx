import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FIRST_PAGE, FORM_INPUTS, INITITIAL_FORM_STATE } from '../../constants';
import FormInput from './FormInput';
import { FormStateType } from '../../App';
import { useAddNewCommentMutation, useUpdateCommentByIdMutation } from '../api/apiSlice';

interface FormProps {
  formState: FormStateType;
  setFormState: Dispatch<SetStateAction<FormStateType>>;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Form({ formState, setFormState, setPage }: FormProps) {
  const [addNewComment] = useAddNewCommentMutation();
  const [updateComentById] = useUpdateCommentByIdMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, ...newComment } = formState;
    if (id) {
      updateComentById({ id, ...newComment });
    } else {
      addNewComment(newComment);
    }
    setFormState(INITITIAL_FORM_STATE);
    setPage(FIRST_PAGE);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        {FORM_INPUTS.map((input) => (
          <FormInput key={input._id} {...input} value={formState[input.name]} onChange={handleChange} />
        ))}
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
}

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
