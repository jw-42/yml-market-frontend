import { RootState } from '@app/store';
import { XMLElement } from '@shared/types/parser';
import { DetailCell } from '@shared/ui/detailCell';
import { DetailLayoutGroup } from '@shared/ui/detailLayoutGroup';
import { YMLParser } from '@shared/utils';
import { Group, Header, Spacing, Separator, Div, Button } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const FileDetails = () => {

  const [obj, setObj] = useState<XMLElement|null>(null);

  const { currentFile } = useSelector((state: RootState) => state.storage);

  useEffect(() => {
    if (currentFile) {
      const parser = new YMLParser(currentFile);
      
      console.log("pre parser.xml2obj()");
      parser.xml2obj()
        .then((res) => setObj(res))
        .catch((error) => console.error(error))
    }
  }, [ currentFile ]);

  return(
    <Group header={
      <Header mode='primary'>Подробная информация</Header>
    }>
      <DetailLayoutGroup>
        <DetailCell header='Всего товаров' children={'42 шт.'} />
        <DetailCell header='Из них доступно' children={'1 шт.'} />
      </DetailLayoutGroup>

      <Spacing>
        <Separator/>
      </Spacing>

      <DetailCell/>
      <DetailCell/>
      <DetailCell/>
      <DetailCell/>

      <Spacing>
        <Separator/>
      </Spacing>

      <DetailCell/>
      <DetailCell/>
      <DetailCell/>

      <Div>
        <Button
          size='m'
          stretched
          mode='secondary'
        >
          Вернуться к загрузке
        </Button>
      </Div>
    </Group>
  );
}