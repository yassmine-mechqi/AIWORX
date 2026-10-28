import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  // Le post-it du navigateur : "en" ou, par défaut, "fr"
  const locale = store.get("locale")?.value === "en" ? "en" : "fr";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});