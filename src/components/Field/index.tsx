import { useCallback } from "react";

import type { FieldProps } from "./types";
import type { Position } from "./types";
import { FieldWrapper } from "./styles";

export function Field({ gridSize = 150, children }: FieldProps) {
  useCallback(
    (x: number, y: number): Position => {
      const snappedX = Math.round(x / gridSize) * gridSize;
      const snappedY = Math.round(y / gridSize) * gridSize;
      return { x: snappedX, y: snappedY };
    },
    [gridSize]
  );

  return <FieldWrapper>{children}</FieldWrapper>;
}
