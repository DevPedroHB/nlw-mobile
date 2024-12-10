import type { CategoryItem } from "@/app/home";
import { FlatList } from "react-native";
import { Category } from "../category";
import { styles } from "./styles";

interface ICategories {
	categories: CategoryItem[];
	selected: string;
	onSelect: (id: string) => void;
}

export function Categories({ categories, selected, onSelect }: ICategories) {
	return (
		<FlatList
			data={categories}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Category
					iconId={item.id}
					name={item.name}
					onPress={() => onSelect(item.id)}
					isSelected={item.id === selected}
				/>
			)}
			horizontal
			contentContainerStyle={styles.content}
			style={styles.container}
			showsHorizontalScrollIndicator={false}
		/>
	);
}
