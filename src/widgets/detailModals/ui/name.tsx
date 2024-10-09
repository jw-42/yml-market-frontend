import { Group, Header, Mark, SimpleCell, IconButton } from '@vkontakte/vkui';
import { Icon24WarningTriangleOutline, Icon24DoneOutline, Icon24BracketsSlashOutline, Icon24CopyOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import { RootState } from '@app/store';
import { wordForm } from '@shared/utils';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const DetailName = () => {

  const { result } = useSelector((state: RootState) => state.storage);

  return(
    <>
      <Group header={<Header mode='secondary'>Отчёт о проверке</Header>}>
        <SimpleCell
          multiline
          before={
            result?.offers.options.main.name?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          subtitle={result?.offers.options.main.name?.length ? (
            `Мы нашли ${wordForm(result.offers.options.main.name.length, 'товар', 'товара', 'товаров')} без названия`
          ) : (
            `Мы не нашли ошибок, связанных с названиями товаров.`
          )}
        >
          Названия товаров
        </SimpleCell>
      </Group>

      {(result?.offers.options.main.name?.length) && (
        <Group>
          <SimpleCell
            multiline
            after={
              <IconButton onClick={() => bridge.send("VKWebAppCopyText", { text: `${result?.offers.options.main.name?.map((offer) => offer).join(', ')}` })}>
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
          Названия товаров должны быть указаны в <Mark>{'<name/>'}</Mark>, либо сформированы из тегов
          <Mark>{'<vendor/>'}</Mark> и <Mark>{'<model/>'}</Mark>.
        </SimpleCell>

        <SimpleCell multiline before={<Icon24WarningTriangleOutline/>}>
          Если вы используете <Mark>{'<vendor/>'}</Mark> и <Mark>{'<model/>'}</Mark>, мы покажем здесь ошибку,
          но это по-прежнему рабочий вариант.
        </SimpleCell>
      </Group>
    </>
  );
}