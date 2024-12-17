import { SimpleCell } from '@vkontakte/vkui';
import { IDetailCell } from '../model';
import { DetailCellSkeleton } from './skeleton';

export const DetailCell = (props: IDetailCell) => {

  if (!props.header || !props.children) {
    return <DetailCellSkeleton/>;
  }

  return(
    <SimpleCell
      subhead={props.header}
      style={{ width: '100%' }}
    >
      {props.children}
    </SimpleCell>
  );
}