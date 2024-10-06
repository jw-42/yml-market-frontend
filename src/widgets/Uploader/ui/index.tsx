import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { FormLayoutGroup, FormItem, FormStatus, Div } from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "@app/store";
import { AppRoutes } from "@app/router";
import { UploadDropZone, UploadInputURL } from "@features/upload-file";
import { setUploadStatus } from "@app/store/storageReducer";
import { YMLParser } from "@shared/utils";


export const Uploader = () => {

  const dispatch = useDispatch();
  const router = useRouteNavigator();

  const { uploadStatus, currentFile } = useSelector((state: RootState) => state.storage);

  useEffect(() => {
    if (currentFile) {
      const parser = new YMLParser(currentFile);

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
            header: "Произошла ошибка",
            description: "Недопустимый тип файла. Поддерживаются только форматы: .XML, .TXT"
          })
        );
      } else {
        router.push(AppRoutes.default.detail);
      }
    }
  }, [ currentFile ]);

  return(
    <FormLayoutGroup>
      {(uploadStatus) && (
        <Div>
          <FormStatus mode={uploadStatus.type} header={uploadStatus.header}>
            {uploadStatus.description}
          </FormStatus>
        </Div>
      )}

      <FormItem top="Ссылка на YML-фид">
        <UploadInputURL/>
      </FormItem>

      <UploadDropZone/>
    </FormLayoutGroup>
  );
}