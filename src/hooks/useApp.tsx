import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

export default function useApp() {
	const FIXED_DURATION = 3600;
	const tick = 100;

	// Splash
	const [isSplashVisible, setIsSplashVisible] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => setIsSplashVisible(false), 4500);
		return () => clearTimeout(timeout);
	}, []);

	// Inputs
	const [durationInput, setDurationInput] = useState("1");
	const [maxMoneyInput, setMaxMoneyInput] = useState("7");
	const [isDurationInvalid, setIsDurationInvalid] = useState(false);
	const [isMoneyInvalid, setIsMoneyInvalid] = useState(false);

	// Estados de ejecución
	const [playFirst, setPlayFirst] = useState(false);
	const [playSecond, setPlaySecond] = useState(false);
	const [panel1Paused, setPanel1Paused] = useState(true);
	const [panel2Paused, setPanel2Paused] = useState(true);

	// Valores congelados
	const [panel1MoneyStep, setPanel1MoneyStep] = useState(0);
	const [panel1IntervalSec, setPanel1IntervalSec] = useState(0);
	const [panel2MoneyStep, setPanel2MoneyStep] = useState(0);
	const [panel2IntervalSec, setPanel2IntervalSec] = useState(0);

	// Progreso
	const [panel1Time, setPanel1Time] = useState(0);
	const [panel2Time, setPanel2Time] = useState(0);
	const [panel1Money, setPanel1Money] = useState(0);
	const [panel2Money, setPanel2Money] = useState(0);

	// Control
	const [reset, setReset] = useState(false);
	const [openResumen, setOpenResumen] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	// Refs y pausas
	const panel1StartRef = useRef<number | null>(null);
	const panel2StartRef = useRef<number | null>(null);
	const [panel1ElapsedBeforePause, setPanel1ElapsedBeforePause] = useState(0);
	const [panel2ElapsedBeforePause, setPanel2ElapsedBeforePause] = useState(0);

	const resetTimers = () => {
		setPanel1Time(0);
		setPanel1Money(0);
		setPanel1ElapsedBeforePause(0);
		panel1StartRef.current = null;

		setPanel2Time(0);
		setPanel2Money(0);
		setPanel2ElapsedBeforePause(0);
		panel2StartRef.current = null;
	};

	const resetAll = () => {
		setPlayFirst(false);
		setPlaySecond(false);
		setPanel1Paused(true);
		setPanel2Paused(true);
		setOpenResumen(false);
		resetTimers();
	};

	const resetFirstPanel = () => {
		setPlayFirst(false);
		setPanel1Paused(true);
		setPanel1Time(0);
		setPanel1Money(0);
		setPanel1ElapsedBeforePause(0);
		panel1StartRef.current = null;
	};

	const resetSecondPanel = () => {
		setPlaySecond(false);
		setPanel2Paused(true);
		setPanel2Time(0);
		setPanel2Money(0);
		setPanel2ElapsedBeforePause(0);
		panel2StartRef.current = null;
	};

	// Panel 1
	useEffect(() => {
		let interval: number | undefined;
		if (playFirst && !panel1Paused && panel1StartRef.current !== null) {
			interval = window.setInterval(() => {
				const now = Date.now();
				const elapsedSec =
					panel1ElapsedBeforePause + (now - panel1StartRef.current!) / 1000;

				setPanel1Time(Math.min(elapsedSec, FIXED_DURATION));

				const intervals = Math.floor(elapsedSec / panel1IntervalSec);
				const total = intervals * panel1MoneyStep;
				setPanel1Money(Math.min(total, Number.MAX_SAFE_INTEGER));
			}, tick);
		}
		return () => clearInterval(interval);
	}, [
		playFirst,
		panel1Paused,
		panel1ElapsedBeforePause,
		panel1IntervalSec,
		panel1MoneyStep,
	]);

	// Panel 2
	useEffect(() => {
		let interval: number | undefined;
		if (playSecond && !panel2Paused && panel2StartRef.current !== null) {
			interval = window.setInterval(() => {
				const now = Date.now();
				const elapsedSec =
					panel2ElapsedBeforePause + (now - panel2StartRef.current!) / 1000;

				setPanel2Time(Math.min(elapsedSec, FIXED_DURATION));

				const intervals = Math.floor(elapsedSec / panel2IntervalSec);
				const total = intervals * panel2MoneyStep;
				setPanel2Money(Math.min(total, Number.MAX_SAFE_INTEGER));
			}, tick);
		}
		return () => clearInterval(interval);
	}, [
		playSecond,
		panel2Paused,
		panel2ElapsedBeforePause,
		panel2IntervalSec,
		panel2MoneyStep,
	]);

	// Abrir resumen automáticamente
	useEffect(() => {
		const p1Done = panel1Paused || panel1Time >= FIXED_DURATION;
		const p2Done = panel2Paused || panel2Time >= FIXED_DURATION;
		if (playFirst && playSecond && p1Done && p2Done && !isOpen) {
			onOpen();
			setOpenResumen(true);
		}
	}, [
		panel1Paused,
		panel2Paused,
		panel1Time,
		panel2Time,
		playFirst,
		playSecond,
		isOpen,
		onOpen,
	]);

	const validateInputs = () => {
		const intervalValid = Number(durationInput) > 0;
		const moneyValid = Number(maxMoneyInput) > 0;
		setIsDurationInvalid(!intervalValid);
		setIsMoneyInvalid(!moneyValid);

		if (!intervalValid || !moneyValid) {
			toast({
				title: "Campos inválidos",
				description: "Todos los campos deben ser mayores a 0.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return false;
		}
		return true;
	};

	const startPanel1 = () => {
		if (!validateInputs()) return;
		setPanel1MoneyStep(Number(maxMoneyInput));
		setPanel1IntervalSec(Number(durationInput));
		panel1StartRef.current = Date.now();
		setPlayFirst(true);
		setPanel1Paused(false);
	};

	const startPanel2 = () => {
		if (!validateInputs()) return;
		setPanel2MoneyStep(Number(maxMoneyInput));
		setPanel2IntervalSec(Number(durationInput));
		panel2StartRef.current = Date.now();
		setPlaySecond(true);
		setPanel2Paused(false);
	};

	const pausePanel1 = () => {
		if (panel1StartRef.current !== null) {
			const now = Date.now();
			const elapsed = (now - panel1StartRef.current) / 1000;
			setPanel1ElapsedBeforePause((prev) => prev + elapsed);
			panel1StartRef.current = null;
		}
		setPanel1Paused(true);
	};

	const pausePanel2 = () => {
		if (panel2StartRef.current !== null) {
			const now = Date.now();
			const elapsed = (now - panel2StartRef.current) / 1000;
			setPanel2ElapsedBeforePause((prev) => prev + elapsed);
			panel2StartRef.current = null;
		}
		setPanel2Paused(true);
	};

	const resumePanel1 = () => {
		panel1StartRef.current = Date.now();
		setPanel1Paused(false);
	};

	const resumePanel2 = () => {
		panel2StartRef.current = Date.now();
		setPanel2Paused(false);
	};

	const pauseAll = () => {
		pausePanel1();
		pausePanel2();
		setReset(true);
	};

	return {
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
		setReset,
		resetAll,
		onClose,
		validateInputs,
		startPanel1,
		startPanel2,
		pauseAll,
		resetFirstPanel,
		resetSecondPanel,
		onOpen,
		pausePanel1,
		resumePanel1,
		pausePanel2,
		resumePanel2,
	};
}
