import React from "react";
import classnames from "classnames";
import "./HighSpeed.css";

interface HighSpeedProps {
  highSpeed: boolean;
  toggle: () => void;
}
export const HighSpeed = (props: HighSpeedProps) => {
  const { highSpeed, toggle } = props;

  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={() => toggle()}>
        <input type="hidden" name="highSpeed" value={String(highSpeed)} />
        <div
          className={classnames("high-speed-track", {
            checked: highSpeed,
          })}
        >
          <span
            className={classnames("high-speed-handle", {
              checked: highSpeed,
            })}
          />
        </div>
      </div>
    </div>
  );
};
