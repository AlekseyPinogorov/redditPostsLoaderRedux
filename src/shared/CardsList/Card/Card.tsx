import React, { CSSProperties } from 'react';
import styles from './card.css';
import { TextContent } from './TextContent';
import { Preview } from './Preview';
import { Menu } from './Menu';
import { Controls } from './Controls';

interface ICardDataProps {
  id: string;
  author?: string;
  title?: string;
  rating?: number;
  avatar?: string;
  previewImg?: string;
  datePostUtc?: number;
  key?: number;
}

export function Card(props: { postData: ICardDataProps, style: CSSProperties }) {
  const {
    id,
    author,
    title,
    rating,
    avatar,
    previewImg,
    datePostUtc,
  } = props.postData;

  return (
    <li
      style={props.style}
      className={styles.card}
      id={id}
      key={id}
    >
      <TextContent author={author} title={title} avatar={avatar} datePostUtc={datePostUtc} id={id} />
      <Preview previewImg={previewImg} />
      <Menu />
      <Controls rating={rating} />
    </li>
  );
}
