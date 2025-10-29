import { useFullScreen, usePlatform } from "../hooks/usePreload";

export default function Title() {
  const platform = usePlatform();
  const isMac = platform === "darwin";
  const isFullScreen = useFullScreen();

  return (
    <div
      className={`select-none text-small font-semibold ${
        isMac && isFullScreen ? "" : ""
      }`}
    >
      Browser AI
    </div>
  );
}
