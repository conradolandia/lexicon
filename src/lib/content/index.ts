import es from './es.json';

export type Content = typeof es;
export type UiStrings = Content['ui'];
export type AboutContent = Content['about'];

const locales = { es } as const;

export type Locale = keyof typeof locales;

/** Active locale. Change when a second language is added. */
export const locale: Locale = 'es';

export const content: Content = locales[locale];
export const ui: UiStrings = content.ui;
export const about: AboutContent = content.about;

/** Replace `{key}` placeholders in a message template. */
export function t(template: string, vars: Record<string, string | number> = {}): string {
	return template.replace(/\{(\w+)\}/g, (_, key: string) =>
		key in vars ? String(vars[key]) : `{${key}}`
	);
}

/** Render the light markdown used in content strings (*em*, **strong**, `code`, [links](url)). */
export function inlineMarkdown(text: string): string {
	const escaped = text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	return escaped
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/`(.+?)`/g, '<code>$1</code>')
		.replace(
			/\[([^\]]+)\]\(([^)]+)\)/g,
			'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
		);
}

/** Plain text for meta tags and attributes (strips light markdown). */
export function stripMarkdown(text: string): string {
	return text
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/\*\*(.+?)\*\*/g, '$1')
		.replace(/\*(.+?)\*/g, '$1')
		.replace(/`(.+?)`/g, '$1');
}
