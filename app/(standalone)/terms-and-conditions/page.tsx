import { readFile } from "node:fs/promises";
import path from "node:path";

import { LegalDocument } from "@/components/legal/LegalDocument";

export default async function TermsAndConditionsPage() {
	const filePath = path.join(
		process.cwd(),
		"content/legal/terms-and-conditions.md"
	);

	const content = await readFile(filePath, "utf8");

	return (
		<section className="pt-8">
			<LegalDocument content={content} />
		</section>
	);
}
