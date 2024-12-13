import { Group, Header, Mark, SimpleCell, IconButton } from '@vkontakte/vkui';
import { Icon24WarningTriangleOutline, Icon24DoneOutline, Icon24BracketsSlashOutline, Icon24CopyOutline, Icon24ListBulletOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import { RootState } from '@app/store';
import { wordForm } from '@shared/utils';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const DetailLotsOfProperties = () => {

  const { result } = useSelector((state: RootState) => state.storage);

  return(
    <>
      <Group header={<Header mode='secondary'>Отчёт о проверке</Header>}>
        <SimpleCell
          multiline
          before={
            result?.offers.options.param.lotsOfProperties?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          subtitle={result?.offers.options.param.lotsOfProperties?.length ? (
            `Мы нашли ${wordForm(result.offers.options.param.lotsOfProperties.length, 'товар', 'товара', 'товаров')}, где указано больше.`
          ) : (
            `Мы не нашли ошибок, связанных с этим ограничением.`
          )}
        >
          Не более 2-х свойств на товар
        </SimpleCell>
      </Group>

      {(result?.offers.options.param.lotsOfProperties?.length) && (
        <Group>
          <SimpleCell
            multiline
            after={
              <IconButton aria-label="copy" onClick={() => bridge.send("VKWebAppCopyText", { text: `${result?.offers.options.param.lotsOfProperties?.map((offer) => offer).join(', ')}` })}>
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
          Свойства товаров передаются внутри тега <Mark>{'<param/>'}</Mark>.
        </SimpleCell>

        <SimpleCell multiline before={<Icon24ListBulletOutline/>}>
          Если хотите, чтобы у товара было свойство с разными значениями (например, цвет «Белый» и «Чёрный»)
          для каждого из  них нужно создать новый товар.
        </SimpleCell>
      </Group>
    </>
  );
}