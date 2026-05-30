import { Header } from "../components/header";
import { InputBar } from "../components/input-bar";
import { useTheme } from "../provider/theme";

export const App = () => {
  const { colors } = useTheme();
  return (
    <box
      justifyContent="center"
      alignItems="center"
      backgroundColor={colors.background}
      width="100%"
      height="100%"
      gap={2}
    >
      <Header />
      <InputBar onSubmit={() => {}} />
    </box>
  );
};
