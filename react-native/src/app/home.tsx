import { Categories } from "@/components/categories";
import type { PlaceItem } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/lib/axios";
import { colors, fontFamily } from "@/styles";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

export interface CategoryItem {
	id: string;
	name: string;
}

export interface IFetchMarketsResponse extends PlaceItem {
	latitude: number;
	longitude: number;
}

const currentLocation = {
	latitude: -23.561187293883442,
	longitude: -46.656451388116494,
};

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

	const getCurrentLocation = useCallback(async () => {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();

			if (granted) {
				const location = await Location.getCurrentPositionAsync();

				console.log(location);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchCategory();
		// getCurrentLocation();
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
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker
					identifier="currentLocation"
					coordinate={{
						latitude: currentLocation.latitude,
						longitude: currentLocation.longitude,
					}}
					image={require("@/assets/location.png")}
				/>
				{markets.map((market) => {
					return (
						<Marker
							key={market.id}
							identifier={market.id}
							coordinate={{
								latitude: market.latitude,
								longitude: market.longitude,
							}}
							image={require("@/assets/pin.png")}
						>
							<Callout onPress={() => router.navigate(`/market/${market.id}`)}>
								<View>
									<Text
										style={{
											fontSize: 14,
											color: colors.gray[600],
											fontFamily: fontFamily.medium,
										}}
									>
										{market.name}
									</Text>
									<Text
										style={{
											fontSize: 12,
											color: colors.gray[600],
											fontFamily: fontFamily.regular,
										}}
									>
										{market.address}
									</Text>
								</View>
							</Callout>
						</Marker>
					);
				})}
			</MapView>
			<Places places={markets} />
		</View>
	);
}
