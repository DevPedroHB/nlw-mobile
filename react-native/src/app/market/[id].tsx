import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Coupon } from "@/components/market/cupon";
import { Details } from "@/components/market/details";
import { api } from "@/lib/axios";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import type { IFetchMarketsResponse } from "../home";

export default function Market() {
	const [market, setMarket] = useState<IFetchMarketsResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
	const [couponIsFetching, setCouponIsFetching] = useState(false);
	const [coupon, setCoupon] = useState<string | null>(null);
	const params = useLocalSearchParams<{ id: string }>();
	const [_, requestPermission] = useCameraPermissions();
	const qrLock = useRef(false);

	async function handleOpenCamera() {
		try {
			const { granted } = await requestPermission();

			if (!granted) {
				return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
			}

			qrLock.current = false;

			setIsVisibleCameraModal(true);
		} catch (error) {
			console.log(error);

			Alert.alert("Câmera", "Não foi possível utilizar a câmera");
		}
	}

	async function getCoupon(id: string) {
		try {
			setCouponIsFetching(true);

			const { data } = await api.patch(`/coupons/${id}`);

			Alert.alert("Cupom", data.coupon);

			setCoupon(data.coupon);
		} catch (error) {
			console.log(error);

			Alert.alert("Erro", "Não foi possível utilizar o cupom");
		} finally {
			setCouponIsFetching(false);
		}
	}

	function handleUseCoupon(id: string) {
		setIsVisibleCameraModal(false);

		Alert.alert(
			"Cupom",
			"Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
			[
				{ style: "cancel", text: "Não" },
				{ text: "Sim", onPress: () => getCoupon(id) },
			],
		);
	}

	const getMarket = useCallback(async () => {
		try {
			const { data } = await api.get(`/markets/${params.id}`);

			setMarket(data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);

			Alert.alert("Erro", "Não foi possível carregar os dados.", [
				{ text: "OK", onPress: () => router.back() },
			]);
		}
	}, [params]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getMarket();
	}, [getMarket, params, coupon]);

	if (isLoading) {
		return <Loading />;
	}

	if (!market) {
		return <Redirect href="/home" />;
	}

	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
			<ScrollView showsHorizontalScrollIndicator={false}>
				<Cover uri={market?.cover} />
				<Details data={market} />
				{coupon && <Coupon code={coupon} />}
			</ScrollView>
			<View style={{ padding: 32 }}>
				<Button onPress={handleOpenCamera}>
					<Button.Title>Ler QR Code</Button.Title>
				</Button>
			</View>
			<Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
				<CameraView
					style={{ flex: 1 }}
					facing="back"
					onBarcodeScanned={({ data }) => {
						if (data && !qrLock.current) {
							qrLock.current = true;
							setTimeout(() => handleUseCoupon(data), 500);
						}
					}}
				/>
				<View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
					<Button
						onPress={() => setIsVisibleCameraModal(false)}
						isLoading={couponIsFetching}
					>
						<Button.Title>Voltar</Button.Title>
					</Button>
				</View>
			</Modal>
		</View>
	);
}
