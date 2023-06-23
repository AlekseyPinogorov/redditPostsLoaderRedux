import React from "react";
import { Comments } from "../Comments/Comments";
import { useCommentsData } from "../../hooks/useCommentsData";

interface ICommentsContainerProps {
  id: string;
}

export function CommentsContainer({ id }: ICommentsContainerProps) {
  const commentsData = useCommentsData(id)
  const { data, loading } = commentsData

  return (
    <Comments commentsData={data} loading={loading} />
  )
}