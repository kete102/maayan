import ReactMarkdown from "react-markdown";

interface LegalDocumentProps {
	content: string;
}

export function LegalDocument({ content }: LegalDocumentProps) {
	return (
		<article className="prose prose-stone prose-headings:font-serif prose-headings:font-normal prose-p:text-foreground/75 prose-li:text-foreground/75 prose-a:text-foreground prose-a:underline-offset-4 max-w-none">
			<ReactMarkdown>{content}</ReactMarkdown>
		</article>
	);
}
