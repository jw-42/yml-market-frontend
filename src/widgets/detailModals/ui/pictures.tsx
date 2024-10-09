import { Group, Header, Mark, SimpleCell, IconButton } from '@vkontakte/vkui';
import { Icon24WarningTriangleOutline, Icon24DoneOutline, Icon24BracketsSlashOutline, Icon24Fullscreen, Icon24PhotosStackOutline, Icon24CopyOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import { RootState } from '@app/store';
import { wordForm } from '@shared/utils';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const DetailPictures = () => {

  const { result } = useSelector((state: RootState) => state.storage);

  return(
    <>
      <Group header={<Header mode='secondary'>Отчёт о проверке</Header>}>
        <SimpleCell
          multiline
          before={
            result?.offers.options.main.picture?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          subtitle={result?.offers.options.main.picture?.length ? (
            `Мы нашли ${wordForm(result.offers.options.main.picture.length, 'товар', 'товара', 'товаров')} без изображений`
          ) : (
            `Мы не нашли ошибок, связанных с изображениями.`
          )}
        >
          Изображения товаров
        </SimpleCell>

        <SimpleCell
          multiline
          before={
            result?.offers.options.picture.lotsOfPictures?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          subtitle={result?.offers.options.picture.lotsOfPictures?.length ? (
            `Мы нашли ${wordForm(result.offers.options.picture.lotsOfPictures?.length, 'товар', 'товара', 'товаров')} с более чем 5 фотографиями.`
          ) : (
            `Мы не нашли ошибок, связанных с количеством фотографий.`
          )}
        >
          Количество фотографий
        </SimpleCell>
      </Group>

      {(result?.offers.options.main.picture?.length || result?.offers.options.picture.lotsOfPictures?.length) && (
        <Group>
          <SimpleCell
            multiline
            after={
              <IconButton onClick={() => bridge.send("VKWebAppCopyText", {
                text: `${
                  result?.offers.options.main.picture?.map((offer) => offer).join(', ')  || 
                  result?.offers.options.picture.lotsOfPictures?.map((offer) => offer).join(', ')
                }`
              })}>
                <Icon24CopyOutline/>
              </IconButton>
            }
            subtitle='Идентификаторы товаров, с которыми возникли проблемы'
          >
            Скопировать в буфер обмена
          </SimpleCell>
        </Group>
      )}

      <Group header={<Header multiline mode='secondary'>Почему может возникать ошибка?</Header>}>
        <SimpleCell multiline before={<Icon24BracketsSlashOutline/>}>
          Изображения необходимо указывать в теге <Mark>{'<picture/>'}</Mark>. Подойдут только прямые
          ссылки на фотографии.
        </SimpleCell>

        <SimpleCell multiline before={<Icon24PhotosStackOutline/>}>
          Необходимо указать не менее одного и не более пяти тегов для каждого из ваших товаров.
        </SimpleCell>

        <SimpleCell multiline before={<Icon24Fullscreen/>}>
          Размер картинок должен быть не менее 400 пикселей по каждой из сторон.
        </SimpleCell>
      </Group>
    </>
  );
}