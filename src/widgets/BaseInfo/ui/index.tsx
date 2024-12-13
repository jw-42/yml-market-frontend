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
          href='https://psv4.userapi.com/s/v1/d/uRM70YWHaR8scavBZDhscUBGcn96Eo_AEvkLweTm_HAZWe2UpN9Vmyc6oie17lEMIMAcGw1f2qocEzRaPeHeGryJMPtf_-pcoU7vEyPX9BehZjip56LG6Q/Primer_fayla_xml.txt'
        >по ссылке</Link>.
      </Text>

      <Spacing size={16} />
      
      <Text style={{ color: baseTheme.colorTextSecondary.normal.value }}>
        Требования к файлу описаны в <Link target='_blank' href='https://vk.com/faq21697'>этой статье</Link>.
      </Text>
    </Div>
  );
}