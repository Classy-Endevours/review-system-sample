import { DefaultRootProps } from "@/core";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export type RootProps = DefaultRootProps;

function Root({ children, puck }: RootProps) {
  return (
    <>
      <Header editMode={puck.isEditing} />
      {children}
    </>
  );
}

export default Root;
