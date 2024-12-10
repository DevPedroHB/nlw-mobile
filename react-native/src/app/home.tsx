import { Categories } from "@/components/categories";
import type { PlaceItem } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";

export interface CategoryItem {
	id: string;
	name: string;
}

interface IFetchMarketsResponse extends PlaceItem {}

export default function Home() {
	const [categories, setCategories] = useState<CategoryItem[]>([]);
	const [category, setCategory] = useState("");
	const [markets, setMarkets] = useState<IFetchMarketsResponse[]>([]);

	const fetchCategory = useCallback(async () => {
		try {
			const { data } = await api.get<CategoryItem[]>("/categories");

			setCategories(data);
			setCategory(data[0].id);
		} catch (error) {
			console.log(error);

			Alert.alert("Categorias", "Não foi possível carregar as categorias.");
		}
	}, []);

	const fetchMarkets = useCallback(async () => {
		try {
			if (!category) {
				return;
			}

			const { data } = await api.get<IFetchMarketsResponse[]>(
				`/markets/category/${category}`,
			);

			setMarkets(data);
		} catch (error) {
			console.log(error);

			Alert.alert("Locais", "Não foi possível carregar os locais.");
		}
	}, [category]);

	useEffect(() => {
		fetchCategory();
	}, [fetchCategory]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchMarkets();
	}, [category, fetchMarkets]);

	return (
		<View style={{ flex: 1, backgroundColor: "#c3c3c3" }}>
			<Categories
				categories={categories}
				onSelect={setCategory}
				selected={category}
			/>
			<Places places={markets} />
		</View>
	);
}
