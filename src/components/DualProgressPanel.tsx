// components/DualProgressPanel.tsx
import {
  Box,
  Button,
  Progress,
  Text,
  VStack,
  HStack,
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
      w="50%"
      p={6}
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <VStack spacing={5} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          {label}
        </Text>

        <Box>
          <Text fontSize="sm" mb={2} color="gray.600">⏱ Tiempo</Text>
          <Progress
            value={(currentTime / duration) * 100}
            colorScheme="blue"
            height="24px"
            rounded="md"
            hasStripe
            isAnimated={isRunning}
          />
          <Text mt={1} fontSize="sm" color="gray.600">
            {currentTime.toFixed(1)}s / {duration}s
          </Text>
        </Box>

        <Box>
          <Text fontSize="sm" mb={2} color="gray.600">💰 Dinero</Text>
          <Progress
            value={(currentMoney / maxMoney) * 100}
            colorScheme="green"
            height="24px"
            rounded="md"
            hasStripe
            isAnimated={isRunning}
          />
          <Text mt={1} fontSize="sm" color="gray.600">
            ${currentMoney.toFixed(0)} / ${maxMoney}
          </Text>
        </Box>

        <HStack justifyContent="flex-end">
          <Button
            onClick={onPauseToggle}
            colorScheme={isPaused ? "green" : "red"}
            leftIcon={isPaused ? <FaPlay /> : <FaPause />}

            size="md"
            variant="solid"
          >
            {isPaused ? "Reanudar" : "Pausar"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
