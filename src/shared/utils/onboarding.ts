import { media } from "@shared/consts/onboardingImages";
import bridge from "@vkontakte/vk-bridge";

export const onboarding = async () => {
  bridge.send("VKWebAppStorageGet", { keys: ["onboardingCompleted","onboardingSkipped"] })
      .then((data) => {
        if (data.keys) {
          if ((Number(data.keys[0].value) === 0) && (Date.now() - Number(data.keys[1].value) > 1000 * 60 * 60 * 24)) {
            bridge.send("VKWebAppShowSlidesSheet", {
              slides: [
                {
                  media,
                  title: "Импорт товаров ВКонтакте",
                  subtitle: "Импортировать товары в магазин ВКонтакте можно только в формате YML. Мы поможем подготовиться к этому шагу."
                },
                {
                  media,
                  title: "Диагностика YML",
                  subtitle: "Загрузите YML-файл в приложение и убедитесь, что он соответствует основным требованиям ВКонтакте."
                },
                {
                  media,
                  title: "Исправление ошибок",
                  subtitle: "Если в результате проверки обнаружились ошибки, исправьте их, прежде чем импортировать товары в сообщество."
                }
              ]
            })
              .then((data) => {
                if (data.result) {
                  switch (data.action) {
                    case "confirm":
                      bridge.send("VKWebAppStorageSet", {
                        key: "onboardingCompleted",
                        value: "1"
                      });
                      break;

                    default:
                      bridge.send("VKWebAppStorageSet", {
                        key: "onboardingSkipped",
                        value: `${Date.now()}`
                      });
                  }
                }
              })
              .catch((e) => console.error(e));
          } else {
            console.log("Skip onboarding");
          }
        }
      })
}