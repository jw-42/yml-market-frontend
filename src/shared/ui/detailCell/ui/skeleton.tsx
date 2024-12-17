import { Div, Skeleton, Spacing } from '@vkontakte/vkui';

export const DetailCellSkeleton = () => {
  return(
    <Div style={{ display: 'flex', flexDirection: 'column', paddingTop: 10, paddingBottom: 10, width: '100%' }}>
      <Skeleton width={'35%'} height={18} />
      <Spacing size={2} />
      <Skeleton width={'75%'} height={20} />
    </Div>
  );
}