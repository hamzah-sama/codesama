import { Header } from "./components/header";
import { InputBar } from "./components/input-bar";
import { ToastProvider } from "./provider/toast/toast-provider";

export const App = () => {
  return (
    <ToastProvider>
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
    </ToastProvider>
  );
};
