import { colors, fontFamily } from "@/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		height: 56,
		maxHeight: 56,
		backgroundColor: colors.green.base,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 14,
	},
	title: {
		color: colors.gray[100],
		fontFamily: fontFamily.semiBold,
		fontSize: 16,
	},
});
