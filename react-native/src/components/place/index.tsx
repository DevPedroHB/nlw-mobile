import { colors } from "@/styles";
import { IconTicket } from "@tabler/icons-react-native";
import React from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
	View,
} from "react-native";
import { styles } from "./styles";

export interface PlaceItem {
	id: string;
	name: string;
	description: string;
	coupons: number;
	cover: string;
	address: string;
}

interface IPlace extends TouchableOpacityProps {
	place: PlaceItem;
}

export function Place({ place, ...rest }: IPlace) {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<Image style={styles.image} source={{ uri: place.cover }} />
			<View style={styles.content}>
				<Text style={styles.name}>{place.name}</Text>
				<Text style={styles.description}>{place.description}</Text>
				<View style={styles.footer}>
					<IconTicket size={16} color={colors.red.base} />
					<Text style={styles.tickets}>{place.coupons} cupons disponíveis</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
