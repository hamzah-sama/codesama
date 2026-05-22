export const Header = () => {
  return (
    <box alignItems="center" justifyContent="center">
      <box justifyContent="center" alignItems="center" flexDirection="row" gap={2}>
        <ascii-font font='tiny' text="code"/>
        <ascii-font font="tiny" text="sama" color='gray'/>
      </box>
    </box>
  );
};
