// Функція перекладу одного поля згідно ключа

const translateField = async ({
  text = "",
  from = "en",
  to = "uk",
  format = "text",
}) => {
  const result = await fetch("https://translate.terraprint.co/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: from,
      target: to,
      format,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const { translatedText } = await result.json();
  return await translatedText;
};

module.exports = translateField;
