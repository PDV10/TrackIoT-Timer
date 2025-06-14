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
	isPaused: boolean;
	isRunning: boolean;
	onPauseToggle: () => void;
};

export default function DualProgressPanel({
	label,
	duration,
	maxMoney,
	currentTime,
	currentMoney,
	isPaused,
	isRunning,
	onPauseToggle,
}: Props) {
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
							value={(currentTime / duration) * 100}
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
							value={(currentMoney / maxMoney) * 100}
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
						colorScheme={isPaused ? "green" : "red"}
						leftIcon={isPaused ? <FaPlay /> : <FaPause />}
						size="md"
						shadow="sm"
					>
						{isPaused ? "Reanudar" : "Pausar"}
					</Button>
				</HStack>
			</VStack>
		</Box>
	);
}
