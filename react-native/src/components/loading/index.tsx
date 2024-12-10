import { colors } from "@/styles";
import { ActivityIndicator } from "react-native";
import { styles } from "./styles";

export function Loading() {
	return (
		<ActivityIndicator color={colors.green.base} style={styles.container} />
	);
}
