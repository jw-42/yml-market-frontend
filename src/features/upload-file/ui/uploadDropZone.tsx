import { DropZone, Footnote, Placeholder, Spacing, File } from '@vkontakte/vkui';
import { Icon56DocumentOutline } from '@vkontakte/icons';
import { setFile } from '@app/store/storageReducer';
import { useDispatch } from 'react-redux';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const UploadDropZone = () => {

  const dispatch = useDispatch();

  const onDragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch( setFile(e.dataTransfer.files[0]) );
  };

  return(
    <DropZone.Grid>
      <DropZone onDragOver={onDragOverHandle} onDrop={onDropHandle}>
      <Placeholder
        icon={<Icon56DocumentOutline/>}
        action={<>
          <File
            mode="secondary"
            onChange={(e) => {
              if (e.currentTarget.files) {
                dispatch( setFile(e.currentTarget.files[0]) );
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