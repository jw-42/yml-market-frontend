import { Div, Headline, Link, Spacing, Text } from "@vkontakte/vkui";

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const BaseInfo = () => {
  return(
    <Div>
      <Headline weight="1">Подготовка к импорту</Headline>

      <Spacing size={16} />

      <Text style={{ color: baseTheme.colorTextSecondary.normal.value }}>
        Приложение позволит проверить YML-файлы, необходимые для импорта товаров в магазин ВКонтакте.
        Пример файла можно скачать <Link
          download
          target='_blank'
          href='https://vk.com/doc-195351530_679535784?hash=2zMI8zzqbwV7CHlbndlpfSCSQ67K0cQ9veHysS4ydJL&dl=cEYFTeX0wnoLeE9fGSDGd9Sdi1PlkEl6ynXB5f9cEes&api=1&no_preview=1'
        >по ссылке</Link>.
      </Text>

      <Spacing size={16} />
      
      <Text style={{ color: baseTheme.colorTextSecondary.normal.value }}>
        Требования к файлу описаны в <Link target='_blank' href='https://vk.com/faq21328'>этой статье</Link>.
      </Text>
    </Div>
  );
}