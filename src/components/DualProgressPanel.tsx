import { Box, Button, Progress, Text, VStack, Flex } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

type Props = {
	label: string; // Ej: "Manual" o "TrackIoT"
	duration: number;
	maxMoney: number;
	currentTime: number;
	currentMoney: number;
	isRunning: boolean;
	hasStarted: boolean;
	reset: () => void;
	onPauseToggle: () => void;
};

export default function DualProgressPanel({
	label,
	duration,
	maxMoney,
	currentTime,
	currentMoney,
	isRunning,
	hasStarted,
	reset,
	onPauseToggle,
}: Props) {
	const progressTime = duration > 0 ? (currentTime / duration) * 100 : 0;
	const progressMoney = maxMoney > 0 ? (currentMoney / maxMoney) * 100 : 0;

	const formatTime = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);
		if (minutes > 0) {
			return `${minutes}:${seconds.toString().padStart(2, "0")}m`;
		}
		return `${totalSeconds.toFixed(1)}s`;
	};

	return (
		<Box
			w={{ base: "100%", md: "50%" }}
			p={6}
			bg="white"
			borderRadius="2xl"
			boxShadow="md"
			border="1px solid"
			borderColor="gray.200"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			h="100%"
		>
			<VStack spacing={6} align="stretch">
				<Text fontSize="2xl" fontWeight="bold" color="gray.700">
					{label}
				</Text>

				<Box>
					<Text fontSize="sm" mb={2} color="gray.500">
						⏱ Tiempo
					</Text>
					<Flex alignItems="center" gap={4}>
						<Progress
							flex="1"
							value={progressTime}
							colorScheme="blue"
							height="20px"
							rounded="md"
							hasStripe
							isAnimated={isRunning}
						/>
						<Text
							fontSize="sm"
							color="gray.600"
							whiteSpace="nowrap"
							minW="20px"
							textAlign="right"
						>
							{formatTime(currentTime)}
						</Text>
					</Flex>
				</Box>

				<Box>
					<Text fontSize="sm" mb={2} color="gray.500">
						💰 Dinero
					</Text>
					<Flex alignItems="center" gap={4}>
						<Progress
							flex="1"
							value={progressMoney}
							colorScheme="green"
							height="20px"
							rounded="md"
							hasStripe
							isAnimated={isRunning}
						/>
						<Text
							fontSize="sm"
							color="gray.600"
							whiteSpace="nowrap"
							minW="20px"
							textAlign="right"
						>
							${currentMoney.toFixed(0)}
						</Text>
					</Flex>
				</Box>
			</VStack>

			<Flex justifyContent="space-between" alignItems="center" pt={6}>
				{/* Espacio vacío a la izquierda para equilibrio */}
				<Box w="48px" />
				{/* Botón central */}
				<Button
					onClick={onPauseToggle}
					colorScheme={isRunning ? "red" : "green"}
					leftIcon={isRunning ? <FaPause /> : <FaPlay />}
					size="md"
					shadow="sm"
				>
					{isRunning ? "Pausar" : hasStarted ? "Reanudar" : "Iniciar"}
				</Button>
				{/* Botón a la derecha */}
				<Button onClick={reset}>
					<FaSync />
				</Button>
			</Flex>
		</Box>
	);
}
