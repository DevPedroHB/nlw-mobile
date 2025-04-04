import { Button } from "@/components/button";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { ImageBackground, View } from "react-native";
import { styles } from "./styles";

interface ICover {
	uri: string;
}

export function Cover({ uri }: ICover) {
	return (
		<ImageBackground source={{ uri }} style={styles.container}>
			<View style={styles.header}>
				<Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
					<Button.Icon icon={IconArrowLeft} />
				</Button>
			</View>
		</ImageBackground>
	);
}
