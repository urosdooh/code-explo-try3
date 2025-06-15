import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import type { AppNode } from "../../GraphViewer/types";
import { LibraryWrapper, LibraryName } from "./styles";

// Libraryes nodes
const LibraryNode = (props: NodeProps<AppNode>) => {
  const { data, selected } = props;
  return (
    <LibraryWrapper selected={selected}>
      <Handle type="source" position={Position.Bottom} />
      <LibraryName>{data.label}</LibraryName>
    </LibraryWrapper>
  );
};

export default memo(LibraryNode);
