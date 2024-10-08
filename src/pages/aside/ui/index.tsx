import { Icon24Download } from '@vkontakte/icons';
import { Panel, Group, FormStatus, Link, SimpleCell } from '@vkontakte/vkui';

export const Aside = () => {
  return(
    <Panel>
      <Group>
        <SimpleCell>Диагностика</SimpleCell>

        <SimpleCell 
          href='https://vk.cc/com8RL'
        >Подробнее о формате</SimpleCell>

        <SimpleCell
          download
          target='_blank'
          after={<Icon24Download/>}
          href='/public/Пример%20файла.xml'
        >Скачать пример файла</SimpleCell>
      </Group>

      <Group>
        <FormStatus header={'Информация для тестировщиков'}>
          Это тестовая версия приложения, она может работать некорректно. <Link target='_blank' href='https://vk.me/jw'>Сообщить об ошибке</Link>.
        </FormStatus>
      </Group>
    </Panel>
  );
}