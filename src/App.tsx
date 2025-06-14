// App.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import DualProgressPanel from "./components/DualProgressPanel";
import SummaryModal from "./components/SummaryModal";

function App() {
  const [duration, setDuration] = useState(60);
  const [maxMoney, setMaxMoney] = useState(10000);
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);

  const [panel1Paused, setPanel1Paused] = useState(false);
  const [panel2Paused, setPanel2Paused] = useState(false);

  const [panel1Time, setPanel1Time] = useState(0);
  const [panel2Time, setPanel2Time] = useState(0);

  const [panel1Money, setPanel1Money] = useState(0);
  const [panel2Money, setPanel2Money] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const tick = 100; // ms

  const resetAll = () => {
    setIsGlobalPlaying(false);
    setPanel1Paused(false);
    setPanel2Paused(false);
    setPanel1Time(0);
    setPanel2Time(0);
    setPanel1Money(0);
    setPanel2Money(0);
  };

  useEffect(() => {
    let timer1: number | null = null;
    if (isGlobalPlaying && !panel1Paused && panel1Time < duration) {
      timer1 = window.setInterval(() => {
        setPanel1Time((prev) => Math.min(prev + tick / 1000, duration));
        setPanel1Money((prev) => Math.min(prev + (maxMoney / duration) * (tick / 1000), maxMoney));
      }, tick);
    }
    return () => clearInterval(timer1!);
  }, [isGlobalPlaying, panel1Paused, panel1Time]);

  useEffect(() => {
    let timer2: number | null = null;
    if (isGlobalPlaying && !panel2Paused && panel2Time < duration) {
      timer2 = window.setInterval(() => {
        setPanel2Time((prev) => Math.min(prev + tick / 1000, duration));
        setPanel2Money((prev) => Math.min(prev + (maxMoney / duration) * (tick / 1000), maxMoney));
      }, tick);
    }
    return () => clearInterval(timer2!);
  }, [isGlobalPlaying, panel2Paused, panel2Time]);

  useEffect(() => {
    const panel1Finalizado = panel1Paused || panel1Time >= duration;
    const panel2Finalizado = panel2Paused || panel2Time >= duration;

    if (isGlobalPlaying && panel1Finalizado && panel2Finalizado && !isOpen) {
      onOpen();
    }
  }, [panel1Paused, panel2Paused, panel1Time, panel2Time]);

  const handlePlay = () => {
    setIsGlobalPlaying(true);
  };

  return (
    <Box p={{ base: 4, md: 8 }} bg="gray.100" minH="100vh">
      <VStack spacing={6} maxW="1280px" mx="auto">
        <Heading size="lg" color="gray.700" textAlign="center">
          Comparador de Progreso
        </Heading>

        <Flex gap={4} flexWrap="wrap" w="100%">
          <Input
            placeholder="Duración (segundos)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            variant="filled"
            bg="white"
            size="md"
            rounded="md"
          />
          <Input
            placeholder="Dinero máximo"
            type="number"
            value={maxMoney}
            onChange={(e) => setMaxMoney(Number(e.target.value))}
            variant="filled"
            bg="white"
            size="md"
            rounded="md"
          />
        </Flex>

        <Button
          onClick={handlePlay}
          colorScheme="teal"
          size="lg"
          px={10}
          leftIcon={<FaPlay />}
          isDisabled={isGlobalPlaying}
          shadow="md"
        >
          Iniciar ambos procesos
        </Button>

        <Flex gap={6} direction={{ base: "column", md: "row" }} width="100%" justifyContent="space-between">
          <DualProgressPanel
            label="Panel 1"
            duration={duration}
            maxMoney={maxMoney}
            currentTime={panel1Time}
            currentMoney={panel1Money}
            isPaused={panel1Paused}
            isRunning={isGlobalPlaying && !panel1Paused}
            onPauseToggle={() => setPanel1Paused((prev) => !prev)}
          />

          <DualProgressPanel
            label="Panel 2"
            duration={duration}
            maxMoney={maxMoney}
            currentTime={panel2Time}
            currentMoney={panel2Money}
            isPaused={panel2Paused}
            isRunning={isGlobalPlaying && !panel2Paused}
            onPauseToggle={() => setPanel2Paused((prev) => !prev)}
          />
        </Flex>

        <SummaryModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            resetAll();
          }}
          panel1={{ time: panel1Time, money: panel1Money }}
          panel2={{ time: panel2Time, money: panel2Money }}
        />
      </VStack>
    </Box>
  );
}

export default App;
