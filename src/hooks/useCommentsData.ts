import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { CommentsState } from "../store/commentsData/reducers";
import { commentsRequestAsync } from "../store/commentsData/actions";

export function useCommentsData(id: string) {
  const data = useSelector<RootState, CommentsState>(state => state.comments)

  const token = useSelector<RootState, string>(state => state.token)
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (token && token.length > 0 && token !== 'undefined') {
      dispatch(commentsRequestAsync(id))
    }
  }, [token])

  return data
}
