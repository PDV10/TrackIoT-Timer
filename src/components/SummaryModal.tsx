import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	VStack,
	HStack,
	Divider,
} from "@chakra-ui/react";

import ComparisonChart from "./ComparisonChart";

type PanelResult = {
	time: number;
	money: number;
};

type Props = {
	isOpen: boolean;
	onClose: () => void;
	panel1: PanelResult; // Manual
	panel2: PanelResult; // TrackIoT
};

export default function SummaryModal({
	isOpen,
	onClose,
	panel1,
	panel2,
}: Props) {
	// Indicadores de mejora (Manual = panel1, TrackIoT = panel2)
	const reduccionTiempo = ((panel2.time - panel1.time) / panel1.time) * 100;
	const reduccionCosto = ((panel2.money - panel1.money) / panel1.money) * 100;

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
			<ModalOverlay />
			<ModalContent bg="white" rounded="xl" shadow="xl">
				<ModalHeader textAlign="center" fontWeight="bold" fontSize="xl">
					📊 Resumen Comparativo
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<VStack spacing={4} align="stretch">
						{/* Encabezados alineados */}
						<HStack justify="space-between">
							<Text w="40%" />
							<Text fontWeight="bold" fontSize="md" w="30%" textAlign="center">
								Manual
							</Text>
							<Text fontWeight="bold" fontSize="md" w="30%" textAlign="center">
								TrackIOT
							</Text>
						</HStack>

						{/* Tiempo */}
						<HStack justify="space-between">
							<Text w="40%">⏱ Tiempo:</Text>
							<Text fontWeight="semibold" w="30%" textAlign="center">
								{panel1.time.toFixed(1)}s
							</Text>
							<Text fontWeight="semibold" w="30%" textAlign="center">
								{panel2.time.toFixed(1)}s
							</Text>
						</HStack>

						{/* Costo */}
						<HStack justify="space-between">
							<Text w="40%">💰 Costo:</Text>
							<Text fontWeight="semibold" w="30%" textAlign="center">
								${panel1.money.toFixed(0)}
							</Text>
							<Text fontWeight="semibold" w="30%" textAlign="center">
								${panel2.money.toFixed(0)}
							</Text>
						</HStack>

						{/* Stock */}

						<HStack justify="space-between">
							<Text w="40%">📊 Stock:</Text>
							<Text
								fontWeight="semibold"
								w="30%"
								textAlign="center"
								color="red.200"
							>
								19/20
							</Text>
							<Text
								fontWeight="semibold"
								w="30%"
								textAlign="center"
								color="green.200"
							>
								20/20
							</Text>
						</HStack>
						<Divider pt={2} />

						{/* Indicadores adicionales */}
						<VStack spacing={2} pt={2} align="stretch">
							<Text fontWeight="bold" textAlign="center" fontSize="md">
								📉 Indicadores de Mejora TrackIoT
							</Text>

							<HStack justify="space-between">
								<Text>⏱ Reducción del Tiempo Total:</Text>
								<Text fontWeight="bold" color="teal.600">
									{reduccionTiempo.toFixed(1)}%
								</Text>
							</HStack>

							<HStack justify="space-between">
								<Text>⚖ Eficiencia control stock :</Text>
								<Text fontWeight="bold" color="teal.600">
									M 95% - T 100%
								</Text>
							</HStack>

							<HStack justify="space-between">
								<Text>💰 Reducción del Costo Total:</Text>
								<Text fontWeight="bold" color="teal.600">
									{reduccionCosto.toFixed(1)}%
								</Text>
							</HStack>
						</VStack>

						{/* Gráfico */}
						<VStack align="stretch" w="100%" h="250px" mb={12}>
							<ComparisonChart panel1={panel1} panel2={panel2} />
						</VStack>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
