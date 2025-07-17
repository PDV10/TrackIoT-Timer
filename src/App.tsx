import {
	Box,
	Button,
	Flex,
	Input,
	VStack,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import { FaPause } from "react-icons/fa";
import DualProgressPanel from "./components/DualProgressPanel";
import SummaryModal from "./components/SummaryModal";
import useApp from "./hooks/useApp";
import SplashScreen from "./components/SplashScreen";

export default function App() {
	const {
		durationInput,
		maxMoneyInput,
		isDurationInvalid,
		isMoneyInvalid,
		playFirst,
		playSecond,
		panel1Paused,
		panel2Paused,
		panel1Time,
		panel2Time,
		panel1Money,
		panel2Money,
		reset,
		isOpen,
		panel1Config,
		panel2Config,
		isSplashVisible,
		openResumen,
		setDurationInput,
		setMaxMoneyInput,
		startPanel1,
		startPanel2,
		setPlayFirst,
		setPlaySecond,
		pauseAll,
		setReset,
		resetAll,
		onClose,
		resetFirstPanel,
		resetSecondPanel,
		onOpen,
		pausePanel1,
		resumePanel1,
		pausePanel2,
		resumePanel2,
	} = useApp();

	const bothRunning = playFirst && playSecond;

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
				<VStack spacing={8} maxW="1440px" mx="auto">
					<Heading size="lg" color="gray.700" textAlign="center">
						Analisis Control de Activos
					</Heading>

					<Flex
						gap={6}
						direction={{ base: "column", md: "row" }}
						width="100%"
						justifyContent="space-between"
					>
						<DualProgressPanel
							label="Control de Inventario Manual"
							duration={panel1Config.duration}
							maxMoney={panel1Config.maxMoney}
							currentTime={panel1Time}
							currentMoney={panel1Money}
							isRunning={playFirst && !panel1Paused}
							hasStarted={panel1Time > 0}
							reset={resetFirstPanel}
							onPauseToggle={() => {
								if (!playFirst) return startPanel1();
								if (panel1Paused) return resumePanel1();
								return pausePanel1();
							}}
						/>

						<DualProgressPanel
							label="Control de Inventario Trackiot"
							duration={panel2Config.duration}
							maxMoney={panel2Config.maxMoney}
							currentTime={panel2Time}
							currentMoney={panel2Money}
							isRunning={playSecond && !panel2Paused}
							hasStarted={panel2Time > 0}
							reset={resetSecondPanel}
							onPauseToggle={() => {
								if (!playSecond) return startPanel2();
								if (panel2Paused) return resumePanel2();
								return pausePanel2();
							}}
						/>
					</Flex>

					<Flex
						direction={{ base: "column", md: "row" }}
						gap={4}
						w="100%"
						justifyContent="center"
						align="flex-end"
						flexWrap="wrap"
					>
						<Flex direction="column" gap={1} w={{ base: "100%", md: "33%" }}>
							<Text fontWeight="semibold">Tiempo</Text>
							<Input
								placeholder="Duración (segundos)"
								type="number"
								value={durationInput}
								onChange={(e) => setDurationInput(e.target.value)}
								isInvalid={isDurationInvalid}
								variant="filled"
								bg="white"
								rounded="md"
							/>
						</Flex>

						<Flex direction="column" gap={1} w={{ base: "100%", md: "33%" }}>
							<Text fontWeight="semibold">Dinero</Text>
							<Input
								placeholder="Dinero máximo"
								type="number"
								value={maxMoneyInput}
								onChange={(e) => setMaxMoneyInput(e.target.value)}
								isInvalid={isMoneyInvalid}
								variant="filled"
								bg="white"
								rounded="md"
							/>
						</Flex>

						{bothRunning ? (
							<Button
								onClick={pauseAll}
								colorScheme="red"
								size="lg"
								w={{ base: "100%", md: "33%" }}
								leftIcon={<FaPause />}
							>
								Pausar ambos
							</Button>
						) : reset ? (
							<Button
								onClick={() => {
									resetAll();
									setReset(false);
								}}
								colorScheme="red"
								size="lg"
								w={{ base: "100%", md: "33%" }}
							>
								Reiniciar
							</Button>
						) : null}

						{openResumen && (
							<Button
								onClick={onOpen}
								colorScheme="teal"
								variant="solid"
								size="lg"
								w={{ base: "100%", md: "33%" }}
							>
								Ver resumen 📊
							</Button>
						)}
					</Flex>

					<SummaryModal
						isOpen={isOpen}
						onClose={() => {
							onClose();
							setReset(true);
							setPlayFirst(false);
							setPlaySecond(false);
						}}
						panel1={{ time: panel1Time, money: panel1Money }}
						panel2={{ time: panel2Time, money: panel2Money }}
					/>
				</VStack>
			</Box>
		</>
	);
}
