import { colors } from "@/styles";
import type { IconProps } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { styles } from "./styles";

export interface IStep {
	icon: React.ComponentType<IconProps>;
	title: string;
	description: string;
}

interface StepProps {
	step: IStep;
}

export function Step({ step }: StepProps) {
	const Icon = step.icon;

	return (
		<View style={styles.container}>
			{Icon && <Icon size={32} color={colors.red.base} />}
			<View style={styles.details}>
				<Text style={styles.title}>{step.title}</Text>
				<Text style={styles.description}>{step.description}</Text>
			</View>
		</View>
	);
}
