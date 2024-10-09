import { Group, Header, Mark, SimpleCell, IconButton } from '@vkontakte/vkui';
import { Icon24WarningTriangleOutline, Icon24DoneOutline, Icon24BracketsSlashOutline, Icon24CopyOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import { RootState } from '@app/store';
import { wordForm } from '@shared/utils';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const DetailPrice = () => {

  const { result } = useSelector((state: RootState) => state.storage);

  return(
    <>
      <Group header={<Header mode='secondary'>Отчёт о проверке</Header>}>
        <SimpleCell
          multiline
          before={
            result?.offers.options.main.price?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          subtitle={result?.offers.options.main.price?.length ? (
            `Мы нашли ${wordForm(result.offers.options.main.price.length, 'товар', 'товара', 'товаров')} без стоимости.`
          ) : (
            `Мы не нашли ошибок, связанных со стоимостью товаров.`
          )}
        >
          Стоимость товаров
        </SimpleCell>
      </Group>

      {(result?.offers.options.main.price?.length) && (
        <Group>
          <SimpleCell
            multiline
            after={
              <IconButton onClick={() => bridge.send("VKWebAppCopyText", { text: `${result?.offers.options.main.price?.map((offer) => offer).join(', ')}` })}>
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
          Стоимость товаров указывается внутри тега <Mark>{'<price/>'}</Mark>.
          Убедитесь, что он есть у каждого товара.
        </SimpleCell>
      </Group>
    </>
  );
}