import { Div, Skeleton } from "@vkontakte/vkui";

export const GroupsListSkeleton = () => {
  return(
    <Div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Skeleton width={50} height={50} style={{ marginRight: 12, borderRadius: 100 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton width={200} height={18} />
          <Skeleton width={100} height={16} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Skeleton width={108} height={28} />
        <Skeleton width={28} height={28} />
      </div>
    </Div>
  );
}