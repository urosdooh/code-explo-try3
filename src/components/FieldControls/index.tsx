import { useReactFlow } from "@xyflow/react";
import { FieldControlsWrapper } from "./styles";
import { useGetZoom } from "./hooks";
export function FieldControls() {
  const { zoomIn, zoomOut, fitView, setViewport, getViewport } = useReactFlow();

  return (
    <FieldControlsWrapper>
      <button onClick={() => zoomIn()}>Увеличить</button>
      <button onClick={() => zoomOut()}>Уменьшить</button>
      <button onClick={() => fitView()}>Показать всё</button>
      <button onClick={() => setViewport({ x: 0, y: 0, zoom: 1 })}>
        Сбросить позицию
      </button>
      <span>Текущий zoom: {useGetZoom().toFixed(2)}</span>
      <button
        onClick={() => {
          const vp = getViewport();
          alert(`Viewport: x=${vp.x}, y=${vp.y}, zoom=${vp.zoom}`);
        }}
      >
        Показать viewport
      </button>
    </FieldControlsWrapper>
  );
}
