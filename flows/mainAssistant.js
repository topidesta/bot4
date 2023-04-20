const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword } = require("@bot-whatsapp/bot");

const mainAssistant = addKeyword(["ASESOR"], {
	sensitive: true,
})
	.addAnswer(
		[
			"*¡Servicio de Atención al Cliente!*".toUpperCase(),
			"",
			"_Porfavor a continuación escriba *un* solo mensaje detallando su solicitud._",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		async (ctx, { provider }) => {
			await functions.contactAssistant(provider, ctx);
		}
	)
	.addAnswer(
		[
			"🛎️ *Solicitud Envíada* ¡Muchas gracias!",
			"Uno de nuestros asesores se *contactará* con usted lo más pronto posible para revisar su solicitud.",
		],
		{
			media:
				"https://lh3.googleusercontent.com/p/AF1QipN7Urqyg4Ad6jFpLw7V8-FLGwT0ggZGySIwDREy=s300",
			delay: functions.randomIntFromInterval(400, 600),
		}
	)
	.addAnswer(
		["Para regresar escriba *MENU*"],
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
	mainAssistant,
};
