import { readFile } from "node:fs/promises";
import path from "node:path";

import { LegalDocument } from "@/components/legal/LegalDocument";

export default async function PrivacyPolicyPage() {
	const filePath = path.join(process.cwd(), "content/legal/privacy-policy.md");

	const content = await readFile(filePath, "utf8");

	return (
		<section className="pt-8">
			<LegalDocument content={content} />
		</section>
	);
}
