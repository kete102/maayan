import { readFile } from "node:fs/promises";
import path from "node:path";

import { LegalDocument } from "@/components/legal/LegalDocument";

export default async function LegalNoticePage() {
	const filePath = path.join(process.cwd(), "content/legal/legal-notice.md");

	const content = await readFile(filePath, "utf8");

	return (
		<main className="mx-auto max-w-full px-7 py-24 md:py-32">
			<LegalDocument content={content} />
		</main>
	);
}
