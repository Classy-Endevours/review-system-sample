import { ReactNode } from "react";


function Root({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <Header editMode={puck.isEditing} /> */}
      {children}
    </>
  );
}

export default Root;
