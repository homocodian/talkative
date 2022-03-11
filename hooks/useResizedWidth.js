import { useRef, useEffect, useState, useCallback } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useResizedWidth = () => {
  const [width, setWidth] = useState(0);
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  const disconnect = useCallback(() => observer.current?.disconnect(), []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [node]);

  useEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, width];
};

export default useResizedWidth;
