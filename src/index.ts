import { parse } from 'cookie';
import { Resend } from 'resend';
import { makeEmail } from './helpers/email';

type Env = {
	RESEND_API_KEY: string;
};

type ContactForm = {
	name?: string;
	email?: string;
	message?: string;
	subject?: string;
	honey?: string;
};

const MINIMUM_TIME = 5000;

const CHARS: { [key: string]: string } = {
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
	return String(string)
		.replace(/[&<>"'`=\/]/g, (character) => CHARS[character])
		.trim();
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Get form time cookie and make sure it's been long enough
		const now = new Date().getTime();
		const cookies = parse(request.headers.get('Cookie') || '');
		const time = parseInt(cookies['dougg_form_time'] || '0');
		const fields = (await request.json()) as ContactForm;

		// If they fail the check, pretend like everything went fine.
		if (time + MINIMUM_TIME > now || fields.subject !== '' || fields.honey !== '') {
			return new Response(JSON.stringify({ message: 'Success', data: { now, time, cookies, fields } }), { status: 200 });
		}

		// Make sure required fields are filled out.
		if (!fields.name || !fields.email || !fields.message) {
			return Response.json({ error: 'Please fill out all required fields.' }, { status: 400 });
		}

		// Message probably isn't spam so send it along.
		delete fields.honey;
		const resend = new Resend(env.RESEND_API_KEY);

		const sanitized = {
			name: sanitize(fields.name || ''),
			email: sanitize(fields.email || ''),
			message: sanitize(`time: ${time}\nnow: ${now}\nafter: ${time + MINIMUM_TIME > now}\n\n${fields.message}` || ''),
		};

		const { data, error } = await resend.emails.send({
			from: 'contact-form@dou.gg',
			to: 'hi@dou.gg',
			subject: `Message from ${sanitized.name}`,
			html: makeEmail(sanitized.name, sanitized.email, sanitized.message),
		});

		return Response.json({ data, error });
	},
};
