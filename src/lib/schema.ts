// tells the search engines what they're lookin' at, ready to drop in the head
export const schema = (data: object) =>
	`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...data })}</script>`;
