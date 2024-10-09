import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon24DoneOutline, Icon24WarningTriangleOutline } from '@vkontakte/icons';
import { Group, Header, Spacing, Separator, Div, Button, SimpleCell } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

import { RootState } from '@app/store';
import { DetailCell } from '@shared/ui/detailCell';
import { DetailLayoutGroup } from '@shared/ui/detailLayoutGroup';
import { wordForm } from '@shared/utils';
import { AppRoutes } from '@app/router';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const FileDetails = () => {

  const router = useRouteNavigator();

  const { result } = useSelector((state: RootState) => state.storage);

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
          onClick={() => router.push(AppRoutes.default.detail.detail, { type: 'name' })}
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
              `Мы нашли ошибки в описании ${wordForm(result.offers.options.main.description.length, 'товара', 'товаров', 'товаров')}.`
            ) : undefined
          }
          after={
            result?.offers.options.main.description?.length ?
              <Icon24WarningTriangleOutline color={baseTheme.colorIconWarning.normal.value} /> :
              <Icon24DoneOutline/>
          }
          onClick={() => router.push(AppRoutes.default.detail.detail, { type: 'description' })}
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
          onClick={() => router.push(AppRoutes.default.detail.detail, { type: 'pictures' })}
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
          onClick={() => router.push(AppRoutes.default.detail.detail, { type: 'price' })}
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
          onClick={() => router.push(AppRoutes.default.detail.detail, { type: 'lotsOfProperties' })}
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
          onClick={() => router.push(AppRoutes.default.detail.detail, { type: 'maximumValuesForProperty' })}
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