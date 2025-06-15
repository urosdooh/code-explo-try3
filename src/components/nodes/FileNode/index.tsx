import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import type { AppNode } from "../../GraphViewer/types";
import { FileWrapper, FileName } from "./styles";

// File nodes
const FileNode = (props: NodeProps<AppNode>) => {
  const { data, selected } = props;
  return (
    <FileWrapper selected={selected}>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      <FileName>{data.label}</FileName>
    </FileWrapper>
  );
};

export default memo(FileNode);
