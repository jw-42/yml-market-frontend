import { Icon24Search } from "@vkontakte/icons";
import { IconButton, Input } from "@vkontakte/vkui";
import { useRef } from "react";

export const UploadInputURL = () => {

  const target = useRef<HTMLInputElement>(null);

  const onSearchHandle = () => console.log(`Fake fetch to ${target.current?.value}...`);

  return(
    <Input
      name="yml-feed-url"
      getRef={target}
      placeholder="https://example.shop/products.xml"
      after={
        <IconButton onClick={onSearchHandle}>
          <Icon24Search/>
        </IconButton>
      }
    />
  );
}