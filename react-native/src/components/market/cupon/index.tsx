import { colors } from "@/styles";
import { IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface ICoupon {
	code: string;
}

export function Coupon({ code }: ICoupon) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Utilize esse cupom</Text>
			<View style={styles.content}>
				<IconTicket size={24} color={colors.green.light} />
				<Text style={styles.code}>{code}</Text>
			</View>
		</View>
	);
}
