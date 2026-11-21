/* A window of the app: its screen in a rounded frame, with no title bar or window dots. */
export default function AppWindow({ children }) {
  return (
    <div className="aw">
      <div className="body">{children}</div>
    </div>
  );
}
