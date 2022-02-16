// import React, { useContext, useState } from "react";

// const SelectedCategoryContext = React.createContext();

// export function useCategory() {
//   return useContext(SelectedCategoryContext);
// }

// export function SelectedCategoryProvider(props) {
//   const [category, setValue] = useState(null);

//   const setCategory = (value) => {
//     setValue(value);
//   };
//   const value = {
//     category,
//     setCategory,
//   };
//   return (
//     <SelectedCategoryContext.Provider value={value}>
//       {props.children}
//     </SelectedCategoryContext.Provider>
//   );
// }
