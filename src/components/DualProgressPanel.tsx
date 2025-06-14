// components/DualProgressPanel.tsx
import {
	Box,
	Button,
	Progress,
	Text,
	VStack,
	HStack,
	Flex,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

type Props = {
	label: string;
	duration: number;
	maxMoney: number;
	currentTime: number;
	currentMoney: number;
	isRunning: boolean;
	hasStarted: boolean;
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
	onPauseToggle,
}: Props) {
	const progressTime = duration > 0 ? (currentTime / duration) * 100 : 0;
	const progressMoney = maxMoney > 0 ? (currentMoney / maxMoney) * 100 : 0;

	return (
		<Box
			w={{ base: "100%", md: "50%" }}
			p={6}
			bg="white"
			borderRadius="2xl"
			boxShadow="md"
			border="1px solid"
			borderColor="gray.200"
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
						<Text mt={1} fontSize="sm" color="gray.600">
							{currentTime.toFixed(1)}s
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
						<Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
							${currentMoney.toFixed(0)}
						</Text>
					</Flex>
				</Box>

				<HStack justifyContent="center" pt={2}>
					<Button
						onClick={onPauseToggle}
						colorScheme={isRunning ? "red" : "green"}
						leftIcon={isRunning ? <FaPause /> : <FaPlay />}
						size="md"
						shadow="sm"
					>
						{isRunning ? "Pausar" : hasStarted ? "Reanudar" : "Iniciar"}
					</Button>
				</HStack>
			</VStack>
		</Box>
	);
}
