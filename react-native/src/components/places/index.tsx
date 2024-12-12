import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import { Place, type PlaceItem } from "../place";
import { styles } from "./styles";

interface IPlaces {
	places: PlaceItem[];
}

export function Places({ places }: IPlaces) {
	const dimensions = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = {
		min: 278,
		max: dimensions.height - 128,
	};

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={[snapPoints.min, snapPoints.max]}
			handleIndicatorStyle={styles.indicator}
			backgroundStyle={styles.container}
			enableOverDrag={false}
		>
			<BottomSheetFlatList
				data={places}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Place
						place={item}
						onPress={() => router.navigate(`/market/${item.id}`)}
					/>
				)}
				contentContainerStyle={styles.content}
				ListHeaderComponent={() => (
					<Text style={styles.title}>Explore locais perto de você</Text>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</BottomSheet>
	);
}
