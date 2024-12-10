import { colors } from "@/styles";
import { categoriesIcons } from "@/utils/categories-icons";
import { Pressable, type PressableProps, Text } from "react-native";
import { styles } from "./styles";

interface ICategory extends PressableProps {
	iconId: string;
	name: string;
	isSelected?: boolean;
}

export function Category({
	iconId,
	name,
	isSelected = false,
	...rest
}: ICategory) {
	const Icon = categoriesIcons[iconId];

	return (
		<Pressable
			style={[styles.container, isSelected && styles.containerSelected]}
			{...rest}
		>
			<Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
			<Text style={[styles.name, isSelected && styles.nameSelected]}>
				{name}
			</Text>
		</Pressable>
	);
}
