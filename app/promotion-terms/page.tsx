import { readFile } from "node:fs/promises";
import path from "node:path";

import { LegalDocument } from "@/components/legal/LegalDocument";

export default async function PromotionTermsPage() {
	const filePath = path.join(process.cwd(), "content/legal/promotion-terms.md");

	const content = await readFile(filePath, "utf8");

	return (
		<main className="mx-auto max-w-3xl px-6 py-24 md:py-32">
			<LegalDocument content={content} />
		</main>
	);
}
