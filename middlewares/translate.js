const { translateBody } = require("../helpers");

const translate = async (req, res, next) => {
  const { lang } = req.query;

  const allowedLanguages = ["ua", "en"];
  const stringifiedAllowedLanguages = allowedLanguages.join(", ");

  if (!allowedLanguages.includes(lang)) {
    throw BadRequest(
      `Choose another type of language. Аvailable options: ${stringifiedAllowedLanguages}.`
    );
  }

  // виявляємо мову НА яку перекладаємо
  const targetLang = allowedLanguages
    .filter((targetLanguage) => targetLanguage !== lang)
    .join("");

  // приймає sourceLang, targetLang, body
  // результат об'єкт з доданими полями з перекладом
  res.body = await translateBody(lang, targetLang, req.body);

  next();
};

module.exports = translate;
