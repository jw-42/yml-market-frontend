import { Panel, Group, FormStatus, Link, SimpleCell } from '@vkontakte/vkui';

export const Aside = () => {
  return(
    <Panel>
      <Group>
        <SimpleCell>Диагностика</SimpleCell>
        <SimpleCell disabled>Сообщества</SimpleCell>
        <SimpleCell disabled>Вопросы и ответы</SimpleCell>
      </Group>

      <Group>
        <SimpleCell disabled>Подробнее о формате</SimpleCell>
        <SimpleCell disabled>Скачать пример файла</SimpleCell>
      </Group>

      <Group>
        <FormStatus header={'Информация для тестировщиков'}>
          Это тестовая версия приложения, она может работать некорректно. <Link target='_blank' href='https://vk.me/jw'>Сообщить об ошибке</Link>.
        </FormStatus>
      </Group>
    </Panel>
  );
}