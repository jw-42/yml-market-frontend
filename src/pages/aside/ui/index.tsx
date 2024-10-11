import { Icon24BugOutline, Icon24DocumentListOutline, Icon24LifebuoyOutline, Icon24Users3Outline } from '@vkontakte/icons';
import { Panel, Group, FormStatus, Link, SimpleCell } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AppRoutes } from '@app/router';

export const Aside = () => {

  const router = useRouteNavigator();

  return(
    <Panel>
      <Group>
        <SimpleCell
          before={<Icon24BugOutline/>}
          onClick={() => router.push(AppRoutes.default.homepage)}
        >
          Диагностика
        </SimpleCell>

        <SimpleCell
          before={<Icon24Users3Outline/>}
          onClick={() => router.push(AppRoutes.groups.default)}
        >
          Мои сообщества
        </SimpleCell>

        <SimpleCell
          before={<Icon24LifebuoyOutline/>}
          onClick={() => router.push(AppRoutes.help.default)}
        >
          Вопросы и ответы
        </SimpleCell>
      </Group>

      <Group>
        <SimpleCell
          target='_blank'
          href='https://vk.cc/com8RL'
          before={<Icon24DocumentListOutline/>}
        >
          Подробнее о YML
        </SimpleCell>
      </Group>

      <Group>
        <FormStatus header={'Информация для тестировщиков'}>
          Это тестовая версия приложения, она может работать некорректно. <Link target='_blank' href='https://vk.me/jw'>Сообщить об ошибке</Link>.
        </FormStatus>
      </Group>
    </Panel>
  );
}