import React from "react";

type TOverlay = {
  color?: boolean;
  onClickOverlay?: () => void;
  zIndex?: number;
};

const Overlay: React.FC<TOverlay> = ({ color, zIndex, onClickOverlay }) => {
  const styles: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: color ? "rgba(0,0,0,.5)" : "transparent",
    zIndex: zIndex || 777,
    cursor: "default",
  };
  return <div style={styles} onClick={onClickOverlay} />;
};

export default React.memo(Overlay);
