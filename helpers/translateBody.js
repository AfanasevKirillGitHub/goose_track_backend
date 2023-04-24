const translateField = require("./translateField");

// Функція перекладу БОДІ
const translateBody = async (sourceLang, targetLang, body) => {
  const newBody = await Object.keys(body).reduce(async (acc, lang) => {
    // База рекурсії
    if (typeof body[lang] !== "object") {
      if (lang === sourceLang) {
        // нормалізуємо таргетну мову для бази щоб в базі було UA
        const normalizedTargetLang = targetLang === "ua" ? "uk" : "en";
        // нормалізуємо ключ вхідної мови для функції перекладу на UK
        const normalizedFromLangKey = lang === "ua" ? "uk" : "en";

        body[targetLang] = await translateField({
          text: await body[sourceLang],
          from: normalizedFromLangKey,
          to: normalizedTargetLang,
        });
        return await body;
      }

      return { ...(await acc), [lang]: await body[lang] };
    } else {
      // Наступний крок рекурсії
      return {
        ...(await acc),
        [lang]: await translateBody(sourceLang, targetLang, await body[lang]),
      };
    }
  }, {});

  return await newBody;
};

module.exports = translateBody;
