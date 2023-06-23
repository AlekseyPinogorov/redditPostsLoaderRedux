import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentForm } from '../CommentForm';
import { updateComment } from '../../store/commentForm/actions';
import { RootState } from '../../store/reducers';

export function CommentFormContainer() {
  const name = useSelector<RootState, string>(state => state.me.data.name)
  const commentText = useSelector<RootState, string>(state => state.commentText)
  const dispatch = useDispatch();

  const [touched, setTouched] = useState(false);
  const [valueError, setValueError] = useState('');

  function validateValue() {
    if (commentText.length <= 3) return 'Введите больше 3х символов';
    return '';
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);

    setValueError(validateValue());

    const isFormValid = !validateValue();
    if (!isFormValid) return;

    alert('Форма отправлена');
    dispatch(updateComment(''));
  };

  function handleBlur() {
    setValueError('');
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(event.target.value));
  }

  return (
    <CommentForm
      value={commentText}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      touched={touched}
      valueError={valueError}
      name={name}
    />
  );
}
