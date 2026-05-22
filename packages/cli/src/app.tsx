import { Header } from "./components/header";
import { InputBar } from "./components/input-bar";

export const App = () => {
  return (
    <box
      justifyContent="center"
      alignItems="center"
      backgroundColor="#0d0d12"
      width="100%"
      height="100%"
      gap={2}
    >
      <Header />
      <InputBar onSubmit={() => {}} />
    </box>
  );
};
