// Description: Function to choose an especific value to Delay a message.
function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Description: Function to send a message to any Assistant.
const assistantNumber = "593988949117@c.us";
async function contactAssistant(provider, ctx) {
	const transmitter = await provider.getInstance();
	const message = [
		`🚨 ¡ATENCIÓN! 🚨`,
		``,
		`Buen día. Ha recibido una nueva solicitud.`,
		`Porfavor, revisar con la mayor *brevedad posible.*`,
		``,
		`*Usuario:* +${ctx.from}`,
		`*Mensaje:* ${ctx.body}`,
	].join("\n");
	await transmitter.sendText(assistantNumber, message);
}

module.exports = {
	randomIntFromInterval,
	contactAssistant,
};
