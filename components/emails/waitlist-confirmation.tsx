import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";

type Props = {
	name: string;
	discountCode: string | null;
	discountExpiresAt: string | null;
};

function WaitlistConfirmationEmail({
	name,
	discountCode,
	discountExpiresAt,
}: Props) {
	return (
		<Html lang="es">
			<Head />
			<Preview>Ya formas parte del comienzo de MAAYAN.</Preview>

			<Body
				style={{
					backgroundColor: "#ede5dd",
					fontFamily: "Georgia, serif",
					color: "#332f2c",
					margin: 0,
					padding: "48px 16px",
				}}
			>
				<Container
					style={{
						maxWidth: 520,
						margin: "0 auto",
						padding: "36px 28px",
						backgroundColor: "#f8f4ef",
					}}
				>
					<Text
						style={{
							textAlign: "center",
							letterSpacing: "0.35em",
							fontSize: 20,
						}}
					>
						MAAYAN
					</Text>

					<Section style={{ paddingTop: 32 }}>
						<Heading
							style={{
								fontSize: 32,
								fontWeight: 400,
								lineHeight: 1.2,
							}}
						>
							Gracias por formar parte del comienzo.
						</Heading>

						<Text>Hola, {name}:</Text>

						<Text>
							Tu inscripción en la primera lista de espera de MAAYAN se ha
							completado.
						</Text>

						{discountCode && discountExpiresAt ? (
							<>
								<Text>
									Como agradecimiento, queremos compartir contigo un descuento
									exclusivo de 5 € para nuestra primera edición.
								</Text>

								<Section
									style={{
										textAlign: "center",
										border: "1px solid #d2c5b3",
										padding: "24px 12px",
										marginTop: 28,
										marginBottom: 28,
									}}
								>
									<Text style={{ fontSize: 12 }}>TU CÓDIGO PERSONAL</Text>

									<Text
										style={{
											fontSize: 22,
											fontWeight: 600,
											letterSpacing: "0.08em",
										}}
									>
										{discountCode}
									</Text>

									<Text style={{ fontSize: 13 }}>
										5 € de descuento · Un solo uso · Válido hasta el{" "}
										{discountExpiresAt}
									</Text>
								</Section>
							</>
						) : (
							<Text>
								Tu inscripción se ha registrado correctamente. Gracias por
								acompañarnos en este comienzo.
							</Text>
						)}

						<Text>
							Las ventas comenzarán el 1 de diciembre de 2026.
							{discountCode
								? " Podrás utilizar tu código durante la compra, sujeto a disponibilidad."
								: " Te avisaremos cuando comience el lanzamiento."}
						</Text>

						<Text style={{ fontSize: 13 }}>
							Recuerda que formar parte de la lista de espera no supone una
							reserva ni garantiza la disponibilidad de una Biblia.
						</Text>

						<Text>Gracias por acompañarnos en este comienzo.</Text>

						<Text>MAAYAN</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

export default WaitlistConfirmationEmail;
