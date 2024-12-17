import { RootState } from '@app/store';
import { wordForm } from '@shared/utils';
import { Icon24WarningTriangleOutline, Icon24DoneOutline, Icon24BracketsSlashOutline, Icon24CopyOutline } from '@vkontakte/icons';
import { Group, Header, IconButton, Mark, SimpleCell } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const DetailDescription = () => {

  const { result } = useSelector((state: RootState) => state.storage);

  return(
    <>
      <Group header={<Header mode='secondary'>Отчёт о проверке</Header>}>
        <SimpleCell
          multiline
          before={
            result?.offers.options.main.description?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          subtitle={result?.offers.options.main.description?.length ? (
            `Мы нашли ошибки в описании ${wordForm(result.offers.options.main.description.length, 'товара', 'товаров', 'товаров')}.`
          ) : (
            `Мы не нашли ошибок в описании товаров.`
          )}
        >
          Описание товаров
        </SimpleCell>
      </Group>

      {(result?.offers.options.main.description?.length) && (
        <Group>
          <SimpleCell
            multiline
            after={
              <IconButton aria-label="copy" onClick={() => bridge.send("VKWebAppCopyText", { text: `${result?.offers.options.main.description?.map((offer) => offer).join(', ')}` })}>
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
          В теге <Mark>{'<description/>'}</Mark> должен быть только текст, без какой-либо HTML-разметки
          и форматирования.
        </SimpleCell>
      </Group>
    </>
  );
}