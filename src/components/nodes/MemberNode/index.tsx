import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import type { AppNode } from "../../GraphViewer/types";
import { MemberWrapper } from "./styles";

//Links
const MemberNode = (props: NodeProps<AppNode>) => {
  const { data, selected } = props;
  return (
    <MemberWrapper selected={selected}>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      {data.label}
    </MemberWrapper>
  );
};

export default memo(MemberNode);
