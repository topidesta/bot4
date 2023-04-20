const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword } = require("@bot-whatsapp/bot");

const mainSignUp = addKeyword(["REGISTRO"], {
	regex: true,
})
	.addAnswer(
		[
			"¡Excelente! Podría indicarme su *nombre* para una atención personalizada.",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		async (ctx, { fallBack }) => {
			if (ctx.body === "NOMBRE") {
				return fallBack(
					"Porfavor, indíqueme su *nombre* para una atención personalizada."
				);
			} else {
				await strapi.setCustomer(ctx.body, ctx.from, ctx.chatId);
			}
		}
	)
	.addAnswer(
		["Muchas gracias, para continuar escriba *MENU*."],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		(ctx, { fallBack }) => {
			if (ctx.body !== "MENU") {
				return fallBack(
					"⚠ ¡Porfavor, escriba la palabra *MENU* correctamente!."
				);
			}
		}
	);

module.exports = {
	mainSignUp,
};
