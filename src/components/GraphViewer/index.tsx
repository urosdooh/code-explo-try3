import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow, MiniMap, Background, BackgroundVariant,
  applyNodeChanges, applyEdgeChanges, addEdge, MarkerType,
} from '@xyflow/react';
import type { OnNodesChange, OnEdgesChange, OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FieldControls } from "../FieldControls";

//types
import type { GraphData, AppNode, AppEdge } from './types'; //graph types
import { nodeTypes } from './types'; // node types
//styles
import { GraphContainer, edgeStyles } from './styles'; //graph styles
//data
import graphData from '../../../data/graph-data.json' with { type: 'json' }; //graph data
import config from '../../../config.json'; //config file
//components
import {Field} from '../Field/index'; 

const { nodes: initialNodes, edges: initialEdges } = graphData as GraphData; //descructure graph data


export default function GraphViewer() {
  const gridSize = config.GRIDSIZE || 150 //grid size from config

  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<AppEdge[]>(initialEdges);
  const [hiddenNodeIds, setHiddenNodeIds] = useState<Set<string>>(new Set());
  
  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds) as AppNode[]), [setNodes]);
  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds) as AppEdge[]), [setEdges]);
  const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds) as AppEdge[]), [setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: AppNode) => {
    setHiddenNodeIds((prevIds) => {
      const newIds = new Set(prevIds);
      if (newIds.has(node.id)) {
        newIds.delete(node.id);
      } else {
        newIds.add(node.id);
      }
      return newIds;
    });
  }, []);

  const nodesWithStyles = useMemo(() => {
    return nodes.map(node => ({
        ...node,
        style: {
            ...node.style,
            opacity: hiddenNodeIds.has(node.id) ? 0.3 : 1,
            transition: 'opacity 300ms ease-in-out',
        }
    }));
  }, [nodes, hiddenNodeIds]);

  const edgesWithStyles = useMemo(() => {
    return edges.map(edge => {
        const isHidden = hiddenNodeIds.has(edge.source) || hiddenNodeIds.has(edge.target);
        const baseStyle = edgeStyles[edge.type as keyof typeof edgeStyles] || {};
        return {
            ...edge,
            type: 'smoothstep',
            style: {
                ...baseStyle,
                opacity: isHidden ? 0.2 : 1,
                transition: 'opacity 300ms ease-in-out',
            },
            animated: edge.type === 'imports' && !isHidden,
            markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: baseStyle.stroke as string },
        };
    });
  }, [edges, hiddenNodeIds]);

  return (
    <GraphContainer>
      <Field gridSize={gridSize}>
        <ReactFlow
          nodes={nodesWithStyles}
          edges={edgesWithStyles}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          snapToGrid={true}
          snapGrid={[gridSize, gridSize]}
        >
          <FieldControls />
          <MiniMap />
          <Background color="black" variant={BackgroundVariant.Cross} gap={gridSize } />
        </ReactFlow>
      </Field>
    </GraphContainer>
  );
}
