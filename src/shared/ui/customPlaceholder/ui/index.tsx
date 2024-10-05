import { Placeholder } from "@vkontakte/vkui";
import { ICustomPlaceholder } from "../model/type";
import { useEffect, useState } from "react";
import { Icon56HourglassOutline, Icon56NewsfeedOutline } from "@vkontakte/icons";

export const CustomPlaceholder = (props: ICustomPlaceholder) => {

  const [icon, setIcon] = useState<any>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    switch (props.type) {
      case "develop":
        setIcon(<Icon56HourglassOutline/>);
        setTitle("Этот раздел ещё в разработке");
        setDescription("Попробуйте заглянуть сюда позже");
        break;

      default:
        setIcon(<Icon56NewsfeedOutline/>);
        setTitle("Здесь пока ничего нет");
        setDescription("Попробуйте заглянуть сюда позже");
    }
  }, [ props ]);

  return(
    <Placeholder icon={icon} header={title}>
      {description}
    </Placeholder>
  );
}