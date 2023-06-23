import React from "react";
import { SearchBlock } from "../SearchBlock/SearchBlock";
import { useUserData } from "../../../hooks/useUserData";

export function SearchBlockContainer() {
  const { data, loading } = useUserData()

  return (
    <SearchBlock iconImg={data.iconImg} name={data.name} loading={loading} />
  );
}
