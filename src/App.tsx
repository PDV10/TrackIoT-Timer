import {
	Box,
	Button,
	Flex,
	Input,
	VStack,
	Heading,
	Image,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import DualProgressPanel from "./components/DualProgressPanel";
import SummaryModal from "./components/SummaryModal";
import useApp from "./hooks/useApp";
import SplashScreen from "./components/SplashScreen";
function App() {
	const {
		durationInput,
		maxMoneyInput,
		isDurationInvalid,
		isMoneyInvalid,
		isGlobalPlaying,
		panel1Paused,
		panel2Paused,
		panel1Time,
		panel2Time,
		panel1Money,
		panel2Money,
		reset,
		isOpen,
		maxMoney,
		duration,
		isSplashVisible,
		setDurationInput,
		setMaxMoneyInput,
		setPanel1Paused,
		setPanel2Paused,
		handlePlay,
		setReset,
		resetAll,
		onClose,
	} = useApp();

	return (
		<>
			<SplashScreen isVisible={isSplashVisible} />
			<Box p={{ base: 4, md: 2 }} bg="gray.100" minH="100vh">
				<Flex justify="flex-start" mb={6}>
					<Image
						src="./assets/trackiot_logo.png"
						alt="Logo TrackIoT"
						height="12"
						objectFit="contain"
					/>
				</Flex>
				<VStack spacing={8} maxW="1280px" mx="auto">
					<Heading size="lg" color="gray.700" textAlign="center">
						Comparador de Progreso
					</Heading>

					<Flex
						gap={6}
						direction={{ base: "column", md: "row" }}
						width="100%"
						justifyContent="space-between"
					>
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

					<Flex
						direction={{ base: "column", md: "row" }}
						gap={4}
						w="100%"
						align="center"
						justify="center"
						flexWrap="wrap"
					>
						<Input
							placeholder="Duración (segundos)"
							type="number"
							value={durationInput}
							onChange={(e) => setDurationInput(e.target.value)}
							isInvalid={isDurationInvalid}
							variant="filled"
							bg="white"
							w={{ base: "100%", md: "33%" }}
							rounded="md"
						/>

						<Input
							placeholder="Dinero máximo"
							type="number"
							value={maxMoneyInput}
							onChange={(e) => setMaxMoneyInput(e.target.value)}
							isInvalid={isMoneyInvalid}
							variant="filled"
							bg="white"
							w={{ base: "100%", md: "33%" }}
							rounded="md"
						/>

						{reset ? (
							<Button
								onClick={() => {
									resetAll();
									setReset(false);
								}}
								colorScheme="red"
								size="lg"
								w={{ base: "100%", md: "33%" }}
								shadow="md"
							>
								Reiniciar
							</Button>
						) : (
							<Button
								onClick={handlePlay}
								colorScheme="teal"
								size="lg"
								w={{ base: "100%", md: "33%" }}
								leftIcon={<FaPlay />}
								isDisabled={isGlobalPlaying}
								shadow="md"
							>
								Iniciar ambos procesos
							</Button>
						)}
					</Flex>

					<SummaryModal
						isOpen={isOpen}
						onClose={() => {
							onClose();
							setReset(true);
						}}
						panel1={{ time: panel1Time, money: panel1Money }}
						panel2={{ time: panel2Time, money: panel2Money }}
					/>
				</VStack>
			</Box>
		</>
	);
}

export default App;
