import { DropZone, Footnote, Placeholder, Spacing, File as VKUIFile } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon56DocumentOutline } from '@vkontakte/icons';
import { useDispatch } from 'react-redux';

import { AppRoutes } from '@app/router';
import { setFile, setUploadStatus } from '@app/store/storageReducer';
import { YMLParser } from '@shared/utils';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const UploadDropZone = () => {

  const dispatch = useDispatch();
  const router = useRouteNavigator();

  const checkFile = (_file: File) => {
    const parser = new YMLParser(_file);

    if (!parser.hasCorrectSize()) {
      dispatch(
        setUploadStatus({
          type: "error",
          header: "Произошла ошибка",
          description: `Допустимый размер файла — до 8 МБ (сейчас ${parser.getFileSize().toFixed(2)} МБ).`
        })
      );
    } else if (!parser.hasCorrectType()) {
      dispatch(
        setUploadStatus({
          type: "error",
          header: "Недопустимый формат",
          description: "Поддерживаются только .XML-файлы."
        })
      );
    } else {
      dispatch( setFile(_file) );
      router.push(AppRoutes.default.detail);
    }
  }

  const onDragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    checkFile(file);
  };

  return(
    <DropZone.Grid>
      <DropZone onDragOver={onDragOverHandle} onDrop={onDropHandle}>
      <Placeholder
        icon={<Icon56DocumentOutline/>}
        action={<>
          <VKUIFile
            mode="secondary"
            onChange={(e) => {
              if (e.currentTarget.files) {
                checkFile( e.currentTarget.files[0] );
              }
            }}
          />

          <Spacing/>

          <Footnote style={{ color: baseTheme.colorTextSecondary.normal.value }}>
            или перетащите сюда
          </Footnote>
        </>}
      />
      </DropZone>
    </DropZone.Grid>
  );
}