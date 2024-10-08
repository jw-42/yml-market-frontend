import { RootState } from '@app/store';
import { XMLValidator } from '@shared/types/parser';
import { DetailCell } from '@shared/ui/detailCell';
import { DetailLayoutGroup } from '@shared/ui/detailLayoutGroup';
import { wordForm, YMLParser } from '@shared/utils';
import { Icon24DoneOutline, Icon24WarningTriangleOutline } from '@vkontakte/icons';
import { Group, Header, Spacing, Separator, Div, Button, SimpleCell } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AppRoutes } from '@app/router';

export const FileDetails = () => {

  const router = useRouteNavigator();

  const [result, setResult] = useState<XMLValidator|null>(null);

  const { currentFile } = useSelector((state: RootState) => state.storage);

  useEffect(() => {
    if (currentFile) {
      const parser = new YMLParser(currentFile);
      
      parser.xml2obj()
        .then((res) => {
          parser.validate(res)
            .then((validationResponse) => setResult(validationResponse))
        })
        .catch((error) => console.error(error))
    }
  }, [ currentFile ]);

  return(
    <Group header={
      <Header mode='primary'>Подробная информация</Header>
    }>
      <DetailLayoutGroup>
        <DetailCell header='Всего товаров' children={
          result ? `${result.offers.count} шт.` : undefined
        } />
        <DetailCell header='Из них доступно' children={
          result ? `${result.offers.available} шт.` : undefined
        } />
      </DetailLayoutGroup>

      <Spacing>
        <Separator/>
      </Spacing>

      {(result) ? (
        <SimpleCell
          subtitle={
            result?.offers.options.main.name?.length ? (
              `${wordForm(result.offers.options.main.name.length, 'товар', 'товара', 'товаров')} без названия`
            ) : undefined
          }
          after={
            result?.offers.options.main.name?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
        >
          Названия товаров
        </SimpleCell>
      ) : (
        <DetailCell/>
      )}

      {(result) ? (
        <SimpleCell
          subtitle={
            result?.offers.options.main.description?.length ? (
              `${wordForm(result.offers.options.main.description.length, 'товар', 'товара', 'товаров')} без описания`
            ) : undefined
          }
          after={
            result?.offers.options.main.description?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
        >
          Описание товаров
        </SimpleCell>
      ) : (
        <DetailCell/>
      )}

      {(result) ? (
        <SimpleCell
          subtitle={
            result?.offers.options.main.picture?.length ? (
              `${wordForm(result.offers.options.main.picture.length || 0, 'товар', 'товара', 'товаров')} без изображений`
            ) : (result?.offers.options.picture.lotsOfPictures?.length) ? (
              `${wordForm(result.offers.options.picture.lotsOfPictures.length, 'товар', 'товара', 'товаров')} с более чем 5 изображениями`
            ) : undefined
          }
          after={
            (result?.offers.options.main.picture?.length || result?.offers.options.picture.lotsOfPictures?.length) ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
        >
          Изображения товаров
        </SimpleCell>
      ) : (
        <DetailCell/>
      )}

      {(result) ? (
        <SimpleCell
          subtitle={
            result?.offers.options.main.price?.length ? (
              `${wordForm(result.offers.options.main.price.length, 'товар', 'товара', 'товаров')} без стоимости`
            ) : undefined
          }
          after={
            result?.offers.options.main.price?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
        >
          Стоимость товаров
        </SimpleCell>
      ) :(
        <DetailCell/>
      )}

      <Spacing>
        <Separator/>
      </Spacing>

      {(result) ? (
        <SimpleCell
          subtitle={
            result?.offers.options.param.lotsOfProperties?.length ? (
              `${wordForm(result?.offers.options.param.lotsOfProperties?.length, 'товар', 'товара', 'товаров')} с большим количеством свойств`
            ) : undefined
          }
          after={
            result?.offers.options.param.lotsOfProperties?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
        >
          Не более 2-х свойств на товар
        </SimpleCell>
      ) :(
        <DetailCell/>
      )}

      {(result) ? (
        <SimpleCell
          subtitle={
            result?.offers.options.param.maximumValuesForProperty?.length ? (
              `${wordForm(result?.offers.options.param.maximumValuesForProperty?.length, 'свойство имеет', 'свойства имеют', 'свойств имеют')} больше значений`
            ) : undefined
          }
          after={
            result?.offers.options.param.maximumValuesForProperty?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
        >
          Не более 50-ти значений на свойство
        </SimpleCell>
      ) :(
        <DetailCell/>
      )}

      <Div>
        <Button
          size='m'
          stretched
          mode='secondary'
          onClick={() => router.push(AppRoutes.default.homepage)}
        >
          Вернуться к загрузке
        </Button>
      </Div>
    </Group>
  );
}