import { colors } from "@/styles";
import type { IconProps } from "@tabler/icons-react-native";
import {
	ActivityIndicator,
	Text,
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";

interface IButton extends TouchableOpacityProps {
	isLoading?: boolean;
}

function Button({ children, style, isLoading, ...rest }: IButton) {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={isLoading}
			style={[styles.container, style]}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator size="small" color={colors.gray[100]} />
			) : (
				children
			)}
		</TouchableOpacity>
	);
}

function Title(props: TextProps) {
	return <Text style={styles.title} {...props} />;
}

interface IIcon extends IconProps {
	icon: React.ComponentType<IconProps>;
}

function Icon({ icon: Icon, ...rest }: IIcon) {
	return <Icon size={24} color={colors.gray[100]} {...rest} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
