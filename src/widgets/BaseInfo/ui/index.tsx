import { Div, Headline, Link, Spacing, Text } from "@vkontakte/vkui";

import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme';

export const BaseInfo = () => {
  return(
    <Div>
      <Headline weight="1">Подготовка к импорту</Headline>

      <Spacing size={16} />

      <Text style={{ color: baseTheme.colorTextSecondary.normal.value }}>
        Приложение позволит проверить YML-файлы, необходимые для импорта товаров в магазин ВКонтакте.
        Требования к файлу описаны в <Link target='_blank' href='https://vk.com/faq21697'>этой статье</Link>.
      </Text>
    </Div>
  );
}