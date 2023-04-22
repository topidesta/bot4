const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword } = require("@bot-whatsapp/bot");

//Keywords Regex
const regex = "^(REGISTRO)$";

//Options Regex
const validatorRegex = "^(MENU)$";

const mainSignUp = addKeyword([regex], {
	regex: true,
})
	.addAnswer(
		[
			"¡Excelente! Podría indicarme su *NOMBRE* para una atención personalizada.",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		async (ctx, { fallBack }) => {
			if (ctx.body === "NOMBRE") {
				return fallBack(
					"⚠ Porfavor, indíqueme su *NOMBRE* para una atención personalizada."
				);
			} else {
				await strapi.setCustomer(ctx.body, ctx.from, ctx.chatId);
			}
		}
	)
	.addAnswer(
		[
			"✅ *¡Muchas gracias!*",
			"Porfavor, escriba la palabra *MENU* para continuar.",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		(ctx, { fallBack }) => {
			if (!ctx.body.match(validatorRegex)) {
				return fallBack(
					"⚠ Porfavor, escriba la palabra *MENU* correctamente."
				);
			}
		}
	);
module.exports = {
	mainSignUp,
};
