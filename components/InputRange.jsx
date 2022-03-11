import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useResizedWidth from "../hooks/useResizedWidth";

const calculateValueFromWidth = (
  value,
  step,
  minValue,
  maxValue,
  truckWidth
) => {
  return Math.floor((minValue + (value / truckWidth) * maxValue) / step) * step;
};

const calculateWidthFromValue = (
  value,
  step,
  minValue,
  maxValue,
  truckWidth
) => {
  const val = value < minValue ? minValue : value;
  const result = ((Math.floor(val / step) * step) / maxValue) * truckWidth;
  return result > truckWidth ? truckWidth : result;
};

const InputRange = ({ initValue = 0, min, max, step, onChange }) => {
  const [value, setVatue] = useState(initValue);
  const [truckRef, truckWidth] = useResizedWidth();
  const [thumbRef, thumbWidth] = useResizedWidth();

  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const widthX = useTransform(x, (value) => {
    return value + thumbWidth;
  });

  useEffect(() => {
    const width = calculateWidthFromValue(value, step, min, max, truckWidth);
    x.set(width);
  }, [value, step, min, max, truckWidth]);

  const handleDrag = (event, info) => {
    const val = calculateValueFromWidth(x.get(), step, min, max, truckWidth);
    setVatue(val);
    onChange && onChange(val);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-2 px-2 bg-gray-300 rounded-full"
    >
      <motion.div ref={truckRef} className="relative w-full">
        <motion.span
          ref={thumbRef}
          tabIndex={0}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          className="absolute top-0 z-10 w-4 h-4 -mt-1 -ml-2 bg-teal-700 rounded-full shadow cursor-pointer"
          style={{ x }}
        />
      </motion.div>
      <motion.span
        className="absolute top-0 left-0 h-2 bg-teal-700 rounded-full"
        style={{ width: widthX }}
      />
    </motion.div>
  );
};

export default InputRange;
