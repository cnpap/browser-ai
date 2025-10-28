import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const send = (globalThis as Record<string, unknown>)["c2VuZA=="] as ((channel: string, message: string) => Promise<unknown>) | undefined;
  const platform = (globalThis as Record<string, unknown>)["cGxhdGZvcm0="] as string | undefined;
  const onFullScreenChanged = (globalThis as Record<string, unknown>)["b25GdWxsU2NyZWVuQ2hhbmdlZA=="] as ((cb: (isFullScreen: boolean) => void) => void) | undefined;
  const isMac = platform === "darwin";
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    onFullScreenChanged?.(setIsFullScreen);
  }, [onFullScreenChanged]);

  return (
    <>
      <div className={`titlebar ${isMac ? "mac" : ""} ${isMac && isFullScreen ? "fullscreen" : ""}`}>
        <div className="window-title">Browser AI</div>
        {!isMac && (
          <div className="window-controls">
            <button className="win-btn" onClick={() => send?.("window-controls", "minimize")}>−</button>
            <button className="win-btn" onClick={() => send?.("window-controls", "toggle-maximize")}>▢</button>
            <button className="win-btn close" onClick={() => send?.("window-controls", "close")}>✕</button>
          </div>
        )}
      </div>
      <h1>Helloword</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;