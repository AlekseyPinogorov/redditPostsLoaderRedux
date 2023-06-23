import React, { CSSProperties, LegacyRef, ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import styles from './cardslist.css';
import { Card } from './Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { load, useRisingPostsData } from '../../hooks/useRisingPostsData';
import { RisingPostsState } from '../../store/risingPostsData/reducers';
import { FixedSizeList as List } from 'react-window';

export function CardsList() {
  const bottomOfList = useRef<HTMLDivElement>(null);

  const risingData = useRisingPostsData(bottomOfList)

  const token = useSelector<RootState, string>(state => state.token);
  const risingAfter = useSelector<RootState, string>(state => state.risingPosts.after)
  const data = useSelector<RootState, RisingPostsState>(state => state.risingPosts)
  const loading = useSelector<RootState, boolean>(state => state.risingPosts.loading);
  const errorLoading = useSelector<RootState, string>(state => state.risingPosts.error);
  const dispatch = useDispatch<any>();
  const count = data.count
  const isloadMore = (count % 3) === 0;

  const [postsDataLength, setPostsDataLength] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    setPostsDataLength(data.data.length);
    setElementHeight(document.documentElement.clientWidth > 1024 ? 147 : 347);

    function getWindowWidth() {
      setElementHeight(document.documentElement.clientWidth > 1024 ? 147 : 347);
    }

    window.addEventListener('resize', getWindowWidth)

    return () => {
      window.removeEventListener('resize', getWindowWidth)
    }
  }, [token, bottomOfList.current, isloadMore])

  function loadMore() {
    load(token, risingAfter, data, count, dispatch)
  }

  const innerElementType = forwardRef((rest: { style: CSSProperties, children: ReactNode }, ref: LegacyRef<HTMLUListElement>) => (
    <ul className={styles.cardsList} ref={ref}>
      {risingData.data[0].id === '' && !loading && !errorLoading && token && token !== '' && token !== 'undefined' && (
        <div style={{ textAlign: 'center' }}>
          Нет ни одного поста
        </div>
      )}

      {rest.children}

      {risingData.data[0].id === '' && !loading && !errorLoading && (!token || token === '' || token === 'undefined') && (
        <div style={{ textAlign: 'center' }}>
          Авторизуйтесь для загрузки постов
        </div>
      )}

      <div ref={bottomOfList} style={{ position: "absolute", top: `${(postsDataLength) * (elementHeight)}px` }}></div>

      {loading && (
        <div style={{ right: '50%', transform: 'translateX(50%)', position: "absolute", top: `${postsDataLength * (elementHeight)}px` }}>
          <div style={{ marginBottom: '40px' }}>Загрузка...</div>
        </div>)}

      {isloadMore && count !== 0 && !loading && (
        <div style={{ right: '50%', transform: 'translateX(50%)', position: "absolute", top: `${postsDataLength * (elementHeight)}px` }}>
          <button onClick={loadMore} className={styles.btnMore}>Загрузить еще</button>
        </div>
      )}

      {errorLoading && (
        <div role="alert" style={{ right: '50%', transform: 'translateX(50%)', position: "absolute", top: `${postsDataLength * (elementHeight)}px` }}>
          {errorLoading}
        </div>
      )}
    </ul>
  ))

  return (
    <List
      itemSize={elementHeight}
      height={800}
      itemCount={postsDataLength}
      width={1000}
      innerElementType={innerElementType}
      style={{ width: '100%' }}
    >
      {({ index, style }) => {
        if (risingData.data[0].id !== '') {
          return (
            <Card postData={data.data[index]} key={index} style={{ ...style, width: '100%' }} />
          )
        } else {
          return null
        }
      }
      }
    </List>
  )
}