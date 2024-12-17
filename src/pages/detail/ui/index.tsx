import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Group, NavIdProps } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from '@app/store';
import { AppRoutes } from '@app/router';
import { DetailCell } from '@shared/ui/detailCell';
import { DetailLayoutGroup } from '@shared/ui/detailLayoutGroup';
import { FileDetails } from '@widgets/FileDetails';
import { ResizePanel } from '@shared/ui/resizePanel';

export const Detail = (props: NavIdProps) => {

  const router = useRouteNavigator();

  const { currentFile } = useSelector((state: RootState) => state.storage);

  useEffect(() => {
    if (!currentFile) {
      void router.push(AppRoutes.default.homepage);
    }
  }, [ currentFile ]);
  
  return(
    <ResizePanel {...props} header={'Результаты'}>
      <Group>
        <DetailLayoutGroup>
          <DetailCell
            header='Имя файла'
            children={currentFile ? currentFile.name.slice(0, 30) : undefined}
          />

          <DetailCell
            header='Размер' 
            children={currentFile ? `${(Number(currentFile?.size)/1024/1024).toFixed(2)} МБ` : undefined}
          />
        </DetailLayoutGroup>
      </Group>

      <FileDetails/>
    </ResizePanel>
  );
}