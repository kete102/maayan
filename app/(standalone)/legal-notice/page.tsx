import { readFile } from "node:fs/promises";
import path from "node:path";

import { LegalDocument } from "@/components/legal/LegalDocument";

export default async function LegalNoticePage() {
	const filePath = path.join(process.cwd(), "content/legal/legal-notice.md");

	const content = await readFile(filePath, "utf8");

	return (
		<section className="pt-8">
			<LegalDocument content={content} />
		</section>
	);
}
