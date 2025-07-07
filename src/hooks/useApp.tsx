// hooks/useApp.ts
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function useApp() {
	const [isSplashVisible, setIsSplashVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setIsSplashVisible(false), 4500);
		return () => clearTimeout(timeout);
	}, []);

	const [durationInput, setDurationInput] = useState("60");
	const [maxMoneyInput, setMaxMoneyInput] = useState("10000");

	const [panel1Config, setPanel1Config] = useState({
		duration: 60,
		maxMoney: 10000,
	});
	const [panel2Config, setPanel2Config] = useState({
		duration: 60,
		maxMoney: 10000,
	});

	const [playFirst, setPlayFirst] = useState(false);
	const [playSecond, setPlaySecond] = useState(false);

	const [panel1Paused, setPanel1Paused] = useState(true);
	const [panel2Paused, setPanel2Paused] = useState(true);

	const [panel1Time, setPanel1Time] = useState(0);
	const [panel2Time, setPanel2Time] = useState(0);
	const [panel1Money, setPanel1Money] = useState(0);
	const [panel2Money, setPanel2Money] = useState(0);

	const [panel1StartTime, setPanel1StartTime] = useState<number | null>(null);
	const [panel2StartTime, setPanel2StartTime] = useState<number | null>(null);

	const [reset, setReset] = useState(false);
	const [isDurationInvalid, setIsDurationInvalid] = useState(false);
	const [isMoneyInvalid, setIsMoneyInvalid] = useState(false);
	const [openResumen, setOpenResumen] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const tick = 100;

	const resetFirstPanel = () => {
		setPlayFirst(false);
		setPanel1Paused(true);
		setPanel1Time(0);
		setPanel1Money(0);
		setPanel1StartTime(null);
	};

	const resetSecondPanel = () => {
		setPlaySecond(false);
		setPanel2Paused(true);
		setPanel2Time(0);
		setPanel2Money(0);
		setPanel2StartTime(null);
	};

	const resetAll = () => {
		resetFirstPanel();
		resetSecondPanel();
		setOpenResumen(false);
	};

	useEffect(() => {
		let timer1: number | null = null;

		if (playFirst && !panel1Paused && panel1StartTime !== null) {
			timer1 = window.setInterval(() => {
				const now = Date.now();
				const elapsed = (now - panel1StartTime) / 1000;
				const clamped = Math.min(elapsed, panel1Config.duration);

				setPanel1Time(clamped);
				setPanel1Money(
					Math.min(
						(panel1Config.maxMoney / panel1Config.duration) * clamped,
						panel1Config.maxMoney,
					),
				);
			}, tick);
		}

		return () => clearInterval(timer1!);
	}, [playFirst, panel1Paused, panel1StartTime, panel1Config]);

	useEffect(() => {
		let timer2: number | null = null;

		if (playSecond && !panel2Paused && panel2StartTime !== null) {
			timer2 = window.setInterval(() => {
				const now = Date.now();
				const elapsed = (now - panel2StartTime) / 1000;
				const clamped = Math.min(elapsed, panel2Config.duration);

				setPanel2Time(clamped);
				setPanel2Money(
					Math.min(
						(panel2Config.maxMoney / panel2Config.duration) * clamped,
						panel2Config.maxMoney,
					),
				);
			}, tick);
		}

		return () => clearInterval(timer2!);
	}, [playSecond, panel2Paused, panel2StartTime, panel2Config]);

	useEffect(() => {
		const p1Done = panel1Time >= panel1Config.duration;
		const p2Done = panel2Time >= panel2Config.duration;

		if (playFirst && playSecond && p1Done && p2Done && !isOpen) {
			onOpen();
			setOpenResumen(true);
		}
	}, [
		panel1Time,
		panel2Time,
		panel1Config.duration,
		panel2Config.duration,
		playFirst,
		playSecond,
		isOpen,
	]);

	const validateInputs = () => {
		const parsedDuration = Number(durationInput);
		const parsedMoney = Number(maxMoneyInput);
		const durationValid = parsedDuration > 0;
		const moneyValid = parsedMoney > 0;
		setIsDurationInvalid(!durationValid);
		setIsMoneyInvalid(!moneyValid);

		if (!durationValid || !moneyValid) {
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
		setPanel1Config({
			duration: Number(durationInput),
			maxMoney: Number(maxMoneyInput),
		});
		setPanel1StartTime(Date.now());
		setPlayFirst(true);
		setPanel1Paused(false);
	};

	const startPanel2 = () => {
		if (!validateInputs()) return;
		setPanel2Config({
			duration: Number(durationInput),
			maxMoney: Number(maxMoneyInput),
		});
		setPanel2StartTime(Date.now());
		setPlaySecond(true);
		setPanel2Paused(false);
	};

	const pauseAll = () => {
		setPanel1Paused(true);
		setPanel2Paused(true);
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
		panel1Config,
		panel2Config,
		reset,
		isOpen,
		isSplashVisible,
		openResumen,
		setDurationInput,
		setMaxMoneyInput,
		setPanel1Paused,
		setPanel2Paused,
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
	};
}
