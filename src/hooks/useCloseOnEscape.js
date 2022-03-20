const { useEffect } = require("react");

function useCloseOnEscape(handler) {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handler();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [handler]);
}

export default useCloseOnEscape;
