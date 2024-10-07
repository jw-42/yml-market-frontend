import { Group, NavIdProps, Spacing, Separator } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Uploader } from '@widgets/Uploader';
import { BaseInfo } from '@widgets/BaseInfo';
import { setFile } from '@app/store/storageReducer';
import { RootState } from '@app/store';
import { ResizePanel } from '@shared/ui/resizePanel';

export const Homepage = (props: NavIdProps) => {

  const dispatch = useDispatch();

  const { currentFile } = useSelector((state: RootState) => state.storage);

  useEffect(() => {
    if (currentFile) {
      dispatch( setFile() );
    }
  }, []);

  return(
    <ResizePanel {...props}>
      <Group>
        <BaseInfo/>

        <Spacing>
          <Separator/>
        </Spacing>

        <Uploader/>
      </Group>
    </ResizePanel>
  );
};