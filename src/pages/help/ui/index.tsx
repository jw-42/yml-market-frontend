import { Accordion, Div, Group, Link, Mark, NavIdProps, Spacing, Text } from '@vkontakte/vkui';
import { useState } from 'react';

import { ResizePanel } from '@shared/ui/resizePanel';

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const Help = (props: NavIdProps) => {

  const data = [
    {
      id: 1,
      title: 'Что такое YML?',
      detail: (
        <>
          <Text>
            YML (Yandex Market Language) — это стандарт, разработанный Яндексом на основе XML. 
            Подробнее о его структуре можно узнать по ссылке: <Link
              target='_blank'
              href={'https://vk.cc/com8RL'}
            >
              vk.cc/com8RL
            </Link>.
          </Text>

          <Spacing/>

          <Text>
            Этот формат используется для работы с товарами в Яндекс Маркете, но в процессе
            перекочевал и ВКонтакте. С его помощью вы можете массово импортировать товары в
            свой магазин ВКонтакте.
          </Text>
        </>
      )
    },{
      id: 2,
      title: 'Как получить YML-файл?',
      detail: (
        <>
          <Text>
            Узнайте в поддержке используемого вами маркетплейса, есть ли у них возможность
            экспортировать товары в этом формате.
          </Text>
        </>
      )
    },{
      id: 3,
      title: 'Можно ли импортировать товары из Excel?',
      detail: (
        <>
          <Text>
            Инструменты ВКонтакте позволяют импортировать товары только из YML-файлов,
            другие форматы не поддерживаются.
          </Text>
        </>
      )
    },{
      id: 4,
      title: 'Приложение не нашло ошибок, но импорт не работает',
      detail: (
        <>
          <Text>
            Мы стараемся охватить все возможные ошибки при диагностике, но
            из-за технических особенностей не можем обнаружить некоторые из них.
          </Text>

          <Spacing/>

          <Text>
            Чтобы разобраться в ситуации, <Link target='_blank' href='https://vk.com/support?act=new_api'>
              обратитесь
            </Link> в поддержку ВКонтакте.
          </Text>
        </>
      )
    },{
      id: 5,
      title: 'У товара есть описание, но сервис показывает ошибку',
      detail: (
        <>
          <Text>
            Зачастую проблема в том, что в описании товара есть сторонняя
            HTML-разметка и форматирование (например, <Mark>CDATA</Mark>).
            Уберите лишние теги и повторите попытку.

            Стоит проверить и количество символов:
            их должно быть от 10 до 4000.
          </Text>
        </>
      )
    }
  ];

  const [openId, setOpenId] = useState<number|null>(null);

  return(
    <ResizePanel {...props} before={false} header='Вопросы и ответы'>
      <Group>
        {data.map(({ id, title, detail }) => (
          <Accordion
            key={id}
            expanded={openId === id}
            onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
          >
            <Accordion.Summary>{title}</Accordion.Summary>
            <Accordion.Content>
              <Div style={{ color: baseTheme.colorTextSecondary.normal.value }}>
                {detail}
              </Div>
            </Accordion.Content>
          </Accordion>
        ))}
      </Group>
    </ResizePanel>
  );
}