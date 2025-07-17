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
		isSplashVisible,
		openResumen,
		setDurationInput,
		setMaxMoneyInput,
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
		startPanel1,
		startPanel2,
	} = useApp();

	const bothRunning = playFirst && playSecond;

	return (
		<>
			<SplashScreen isVisible={isSplashVisible} />

			<Box
				p={{ base: 4, md: 2 }}
				bg="gray.100"
				minH="100vh"
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
			>
				<Box flex={1}>
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
							Análisis Control de Activos
						</Heading>

						<Flex
							gap={6}
							direction={{ base: "column", md: "row" }}
							width="100%"
							justifyContent="space-between"
						>
							<DualProgressPanel
								label="Control de Inventario Manual"
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
								label="Control de Inventario TrackIoT"
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
								<Flex gap={1} align="center">
									<Text fontWeight="semibold">Tiempo</Text>
									<Text as="span" color="gray.500">
										(segundos)
									</Text>
								</Flex>
								<Input
									placeholder="Ej: 60"
									type="number"
									value={durationInput}
									onChange={(e) => {
										if (
											Number(e.target.value) > 60 ||
											Number(e.target.value) < 0
										) {
											return;
										}
										setDurationInput(e.target.value);
									}}
									isInvalid={isDurationInvalid}
									variant="filled"
									bg="white"
									rounded="md"
								/>
								<Text fontSize="sm" color="gray.500">
									Cada cuántos segundos se sumará dinero.
								</Text>
							</Flex>

							<Flex direction="column" gap={1} w={{ base: "100%", md: "33%" }}>
								<Text fontWeight="semibold">Costo</Text>
								<Input
									placeholder="Ej: 10000"
									type="number"
									value={maxMoneyInput}
									onChange={(e) => setMaxMoneyInput(e.target.value)}
									isInvalid={isMoneyInvalid}
									variant="filled"
									bg="white"
									rounded="md"
								/>
								<Text fontSize="sm" color="gray.500">
									Monto que se añadirá cada{" "}
									{Number(durationInput) > 0 ? durationInput : "x"} segundos.
								</Text>
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
				<Flex justifyContent="center">
					<Text color="gray.500">
						Costo por segundo calcudo en RandStandard Argentina.
					</Text>
				</Flex>
			</Box>
		</>
	);
}
