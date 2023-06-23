import React from "react";
import { CardsList } from "../CardsList";
import { usePostsData } from "../../hooks/usePostsData";

export function CardsListContainer() {
  // const postsData = usePostsData()
  // const { data, loading } = postsData

  return (
    <CardsList
    // postsData={data} loading={loading}
    />
  )
}
