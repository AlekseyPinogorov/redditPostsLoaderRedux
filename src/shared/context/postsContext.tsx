// import React from "react";
// import { usePostsData } from "../../hooks/usePostsData";

// export interface IPostsContextData {
//   id?: string;
//   author?: string;
//   title?: string;
//   rating?: number;
//   avatar?: string;
//   previewImg?: string;
//   datePostUtc?: number;
// }

// export const postsContext = React.createContext<Array<IPostsContextData>>([])

// export function PostsContextProvider({ children }: { children: React.ReactNode }) {
//   const [data] = usePostsData();

//   return (
//     <postsContext.Provider value={data}>
//       {children}
//     </postsContext.Provider>
//   )
// }