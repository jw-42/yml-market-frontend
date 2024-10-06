import { Group, NavIdProps, Panel, Spacing, Separator } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Uploader } from '@widgets/Uploader';
import { BaseInfo } from '@widgets/BaseInfo';
import { setFile } from '@app/store/storageReducer';
import { RootState } from '@app/store';

export const Homepage = (props: NavIdProps) => {

  const dispatch = useDispatch();

  const { currentFile } = useSelector((state: RootState) => state.storage);

  useEffect(() => {
    if (currentFile) {
      dispatch( setFile() );
    }
  }, []);

  return(
    <Panel {...props}>
      <Group>
        <BaseInfo/>

        <Spacing>
          <Separator/>
        </Spacing>

        <Uploader/>
      </Group>
    </Panel>
  );
};