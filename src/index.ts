import { Resend } from 'resend';
import { makeEmail } from './helpers/email';

const chars: { [key: string]: string } = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	'/': '&#x2F;',
	'`': '&#x60;',
	'=': '&#x3D;',
};

const sanitize = (string: string) => {
	return String(string).replace(/[&<>"'`=\/]/g, function (s) {
		return chars[s];
	});
};

export default {
	async fetch(request: any, env: any, ctx: any) {
		const resend = new Resend(env.RESEND_API_KEY);

		const fields = await request.json();
		const sanitized: any = {};

		for (const field of Object.keys(fields)) {
			Object.assign(sanitized, {
				[field]: sanitize(fields[field]).trim(),
			});
		}

		const { data, error } = await resend.emails.send({
			from: 'contact-form@dou.gg',
			to: 'hi@dou.gg',
			subject: `Message from ${sanitized.name}`,
			html: makeEmail(sanitized.name, sanitized.email, sanitized.message),
		});

		return Response.json({ data, error });
	},
};
