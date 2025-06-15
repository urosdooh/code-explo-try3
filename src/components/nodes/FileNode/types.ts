// export type CustomNodeData = {
//   label: string; // Имя файла, например 'App.tsx'
//   type: string; // Расширение, например '.tsx'
//   fullPath: string; // Относительный путь к файлу
// };
// export type CustomNode = {
//   id: string; // Уникальный идентификатор узла
//   type: "file"; // Тип узла, здесь это 'file'
//   data: CustomNodeData; // Данные узла, соответствующие CustomNodeData
//   position: { x: number; y: number }; // Позиция узла на графике
//   selected?: boolean; // Флаг, выбран ли узел
// };
// export type CustomEdge = {
//   id: string; // Уникальный идентификатор ребра
//   source: string; // ID исходного узла
//   target: string; // ID целевого узла
//   type?: string; // Тип ребра, например 'default'
//   animated?: boolean; // Флаг, анимировано ли ребро
//   label?: string; // Метка ребра, если требуется
// };
// export type CustomNodeProps = {
//   node: CustomNode; // Узел, который мы хотим отобразить
//   isConnectable?: boolean; // Флаг, можно ли соединять узлы
//   selected?: boolean; // Флаг, выбран ли узел
// };
// export type CustomEdgeProps = {
//   edge: CustomEdge; // Ребро, которое мы хотим отобразить
//   isConnectable?: boolean; // Флаг, можно ли соединять ребра
//   selected?: boolean; // Флаг, выбрано ли ребро
// };
// export type CustomFlowProps = {
//   nodes: CustomNode[]; // Массив узлов, которые мы хотим отобразить
//   edges: CustomEdge[]; // Массив ребер, которые мы хотим отобразить
//   onNodeClick?: (node: CustomNode) => void; // Обработчик клика по узлу
//   onEdgeClick?: (edge: CustomEdge) => void; // Обработчик клика по ребру
// };
// export type CustomFlowState = {
//   nodes: CustomNode[]; // Текущее состояние узлов
//   edges: CustomEdge[]; // Текущее состояние ребер
//   selectedNode?: CustomNode; // Выбранный узел, если есть
//   selectedEdge?: CustomEdge; // Выбранное ребро, если есть
//   isConnecting: boolean; // Флаг, указывающий, происходит ли соединение узлов
// };
