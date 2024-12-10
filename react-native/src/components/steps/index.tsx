import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { type IStep, Step } from "../step";
import { styles } from "./styles";

export const steps: IStep[] = [
	{
		icon: IconMapPin,
		title: "Encontre estabelecimentos",
		description: "Veja locais perto de você que são parceiros da Nearby",
	},
	{
		icon: IconQrcode,
		title: "Ative o cupom com QR Code",
		description: "Escaneie o código no estabelecimento para usar o benefício",
	},
	{
		icon: IconTicket,
		title: "garanta vantagens perto de você",
		description:
			"Ative cupons onde estiver, em diferentes tipos de estabelecimento",
	},
];

export function Steps() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Veja como funciona:</Text>
			{steps.map((step) => {
				return <Step key={step.title} step={step} />;
			})}
		</View>
	);
}
