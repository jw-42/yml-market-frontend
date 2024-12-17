import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ModalPage, ModalPageHeader, NavIdProps, Div, Button } from '@vkontakte/vkui';
import { DetailSection } from '@widgets/detailModals';

export const DetailModal = (props: NavIdProps) => {

  const router = useRouteNavigator();
  const params = useParams<'type'>();

  return(
    <ModalPage {...props} header={
      <ModalPageHeader>
        {(params?.type === 'name') && ('Названия товаров')}
        {(params?.type === 'description') && ('Описание товаров')}
        {(params?.type === 'pictures') && ('Изображения товаров')}
        {(params?.type === 'price') && ('Стоимость товаров')}

        {(params?.type === 'lotsOfProperties') && ('Параметры')}
        {(params?.type === 'maximumValuesForProperty') && ('Параметры')}
      </ModalPageHeader>
    }>
      {(params?.type === 'name') && (<DetailSection.DetailName/>)}
      {(params?.type === 'description') && (<DetailSection.DetailDescription/>)}
      {(params?.type === 'pictures') && (<DetailSection.DetailPictures/>)}
      {(params?.type === 'price') && (<DetailSection.DetailPrice/>)}

      {(params?.type === 'lotsOfProperties') && (<DetailSection.DetailLotsOfProperties/>)}
      {(params?.type === 'maximumValuesForProperty') && (<DetailSection.DetailMaximumValuesForProperty/>)}

      <Div>
        <Button
          size='l'
          stretched
          mode='secondary'
          onClick={() => router.hideModal()}
        >
          Понятно
        </Button>
      </Div>
    </ModalPage>
  );
}