import styled from "styled-components";
import config from "../../../file-explorer.config.json";

export const GraphContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

// Явно определяем тип для нашего конфига стилей, чтобы TypeScript не ошибался
type EdgeStyleConfig = {
  imports: { color: string; width: number };
  definedIn: { color: string; width: number; dash: string };
};

// Приводим viewer-часть конфига к нашему типу
const edgeConfig = config.viewer.styles.edges as unknown as EdgeStyleConfig;

// Собираем объект со стилями, используя значения из конфига
export const edgeStyles = {
  imports: {
    stroke: edgeConfig.imports.color,
    strokeWidth: edgeConfig.imports.width,
  },
  definedIn: {
    stroke: edgeConfig.definedIn.color,
    strokeWidth: edgeConfig.definedIn.width,
    strokeDasharray: edgeConfig.definedIn.dash,
  },
};
