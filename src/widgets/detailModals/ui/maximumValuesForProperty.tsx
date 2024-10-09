import { Group, Header, SimpleCell, IconButton } from '@vkontakte/vkui';
import { Icon24WarningTriangleOutline, Icon24DoneOutline, Icon24CopyOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import { RootState } from '@app/store';
import { wordForm } from '@shared/utils';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const DetailMaximumValuesForProperty = () => {

  const { result } = useSelector((state: RootState) => state.storage);

  return(
    <>
      <Group header={<Header mode='secondary'>Отчёт о проверке</Header>}>
        <SimpleCell
          multiline
          before={
            result?.offers.options.param.maximumValuesForProperty?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          subtitle={result?.offers.options.param.maximumValuesForProperty?.length ? (
            `Мы нашли ${wordForm(result.offers.options.param.maximumValuesForProperty.length, 'свойство', 'свойства', 'свойств')}, где указано больше значений.`
          ) : (
            `Мы не нашли ошибок, связанных с этим ограничением.`
          )}
        >
          Не более 50-ти значений на свойство
        </SimpleCell>
      </Group>

      {(result?.offers.options.param.maximumValuesForProperty?.length) && (
        <Group>
          <SimpleCell
            multiline
            after={
              <IconButton onClick={() => bridge.send("VKWebAppCopyText", { text: `«${result?.offers.options.param.maximumValuesForProperty?.map((offer) => offer).join('», «')}»` })}>
                <Icon24CopyOutline/>
              </IconButton>
            }
            subtitle='Названия свойств, с которыми возникли проблемы'
          >
            Скопировать в буфер обмена
          </SimpleCell>
        </Group>
      )}
    </>
  );
}