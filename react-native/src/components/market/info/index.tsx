import { colors } from "@/styles";
import type { IconProps } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface IInfo {
	description: string;
	icon: React.ComponentType<IconProps>;
}

export function Info({ icon: Icon, description }: IInfo) {
	return (
		<View style={styles.container}>
			<Icon size={16} color={colors.gray[400]} />
			<Text style={styles.text}>{description}</Text>
		</View>
	);
}
