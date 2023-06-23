import React, { ChangeEvent } from 'react';
import styles from './commentformreacthookform.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../store/commentForm/actions';

type Textarea = {
  commentsInput: string;
}

export function CommentFormReactHookForm() {
  const value = useSelector((state: any) => state.commentText)
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Textarea>();
  const onSubmit: SubmitHandler<Textarea> = () => {
    alert('Форма отправлена');
    setValue('commentsInput', '');
    dispatch(updateComment(getValues('commentsInput')));
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue('commentsInput', event.target.value);
    dispatch(updateComment(getValues('commentsInput')));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
      <textarea
        className={styles.input}
        value={value}
        {...register('commentsInput', { required: true, minLength: 4 })}
        onChange={handleChange}
      />
      {errors.commentsInput && <div>Введите больше 3х символов</div>}
      <div className={styles.controlsWrapper}>
        <div className={styles.controls}></div>
        <button type='submit' className={styles.button}>Комментировать</button>
      </div>
    </form>
  );
}
