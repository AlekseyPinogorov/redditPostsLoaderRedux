import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { postsRequestAsync } from "../store/postsData/actions";
import { PostsState } from "../store/postsData/reducers";


export function usePostsData() {
  const data = useSelector<RootState, PostsState>(state => state.posts)

  const token = useSelector<RootState, string>(state => state.token)
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (token && token.length > 0 && token !== 'undefined') {
      dispatch(postsRequestAsync())
    }
  }, [token])

  return data
}
