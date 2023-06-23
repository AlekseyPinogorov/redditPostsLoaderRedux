import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import {
  risingPostsRequest,
  risingPostsRequestAfter,
  risingPostsRequestCount,
  risingPostsRequestError,
  risingPostsRequestSuccess
} from "../store/risingPostsData/actions";
import axios from "axios";
import { RisingPostsState } from "../store/risingPostsData/reducers";

export async function load(token: string, risingAfter: string, data: RisingPostsState, count: number, dispatch: any) {

  dispatch(risingPostsRequest())

  try {
    const { data: { data: { after, children } } } = await axios.get('https://oauth.reddit.com/rising/', {
      headers: { Authorization: `bearer ${token}` },
      params: {
        limit: 10,
        sr_detail: true,
        after: risingAfter,
      }
    })

    const risingPostsData = children.map(
      (item: { data: any }) => ({
        id: item.data.id,
        author: item.data.author,
        title: item.data.title,
        rating: item.data.ups,
        avatar: item.data.sr_detail.icon_img
          ? item.data.sr_detail.icon_img
          : "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png",
        previewImg: item.data.preview
          ? item.data.preview.images?.[0].source.url.replace(
            /(\&amp\;)/g,
            "&"
          )
          : 'https://cdn.dribbble.com/userupload/6189449/file/original-95b7e7d207e93d84986b86368d205705.jpg?compress=1&resize=752x',
        datePostUtc: item.data.created_utc * 1000,
      })
    )

    dispatch(risingPostsRequestAfter(after))
    if (data.data[0].id === '') {
      dispatch(risingPostsRequestSuccess(risingPostsData))
    } else {
      dispatch(risingPostsRequestSuccess(data.data.concat(...risingPostsData)))
    }
    dispatch(risingPostsRequestCount(count + 1))
  } catch (error) {
    dispatch(risingPostsRequestError(String(error)))
  }
}

export function useRisingPostsData(ref: any) {
  const data = useSelector<RootState, RisingPostsState>(state => state.risingPosts)
  const risingAfter = useSelector<RootState, string>(state => state.risingPosts.after)
  const count = useSelector<RootState, number>(state => state.risingPosts.count)
  const token = useSelector<RootState, string>(state => state.token)
  const error = useSelector<RootState, string>(state => state.risingPosts.error)
  const dispatch = useDispatch<any>();
  const isloadMore = (count % 3) === 0;

  useEffect(() => {
    if (token && token.length > 0 && token !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          load(token, risingAfter, data, count, dispatch)
        }
      }, {
        rootMargin: '10px'
      })

      if (ref.current && error === "" && (!isloadMore || count === 0)) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current && error === "" && (!isloadMore || count === 0)) {
          observer.unobserve(ref.current)
        }
      }
    }
  }, [ref.current, risingAfter, count, token])

  return data
}
