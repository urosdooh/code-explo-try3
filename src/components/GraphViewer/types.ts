import type { Node, Edge } from "@xyflow/react";

import FileNode from "../nodes/FileNode";
import MemberNode from "../nodes/MemberNode";
import LibraryNode from "../nodes/LibraryNode";

export const nodeTypes = {
  file: FileNode,
  member: MemberNode,
  library: LibraryNode,
};

// Это тип для наших кастомных данных внутри каждого узла.
export type NodeData = {
  label: string;
  type: "member" | "file" | "library";
  fullPath: string;
};

// Это тип для узла в нашем приложении. Он расширяет базовый тип Node из React Flow,
// уточняя, что поле `data` имеет наш тип NodeData.
export type AppNode = Node<NodeData>;

// Это тип для связи в нашем приложении, с нашими кастомными типами.
export type AppEdge = Edge & {
  // ИСПРАВЛЕНИЕ: Мы расширяем тип, чтобы он включал и наши кастомные типы
  // для стилизации, и типы рендереров, которые использует React Flow.
  type?: "imports" | "definedIn" | "smoothstep";
};

// Тип для данных, которые мы загружаем из JSON.
export type GraphData = {
  nodes: AppNode[];
  edges: AppEdge[];
};
