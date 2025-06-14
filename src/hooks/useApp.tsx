import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function useApp() {
	// al principio del componente App
	const [isSplashVisible, setIsSplashVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsSplashVisible(false);
		}, 4500); // duración igual a la transición inicial

		return () => clearTimeout(timeout);
	}, []);

	const [durationInput, setDurationInput] = useState("60");
	const [maxMoneyInput, setMaxMoneyInput] = useState("10000");

	const [duration, setDuration] = useState(60);
	const [maxMoney, setMaxMoney] = useState(10000);
	const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);

	const [panel1Paused, setPanel1Paused] = useState(false);
	const [panel2Paused, setPanel2Paused] = useState(false);

	const [panel1Time, setPanel1Time] = useState(0);
	const [panel2Time, setPanel2Time] = useState(0);

	const [panel1Money, setPanel1Money] = useState(0);
	const [panel2Money, setPanel2Money] = useState(0);
	const [reset, setReset] = useState(false);

	const [isDurationInvalid, setIsDurationInvalid] = useState(false);
	const [isMoneyInvalid, setIsMoneyInvalid] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
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
				setPanel1Money((prev) =>
					Math.min(prev + (maxMoney / duration) * (tick / 1000), maxMoney),
				);
			}, tick);
		}
		return () => clearInterval(timer1!);
	}, [isGlobalPlaying, panel1Paused, panel1Time]);

	useEffect(() => {
		let timer2: number | null = null;
		if (isGlobalPlaying && !panel2Paused && panel2Time < duration) {
			timer2 = window.setInterval(() => {
				setPanel2Time((prev) => Math.min(prev + tick / 1000, duration));
				setPanel2Money((prev) =>
					Math.min(prev + (maxMoney / duration) * (tick / 1000), maxMoney),
				);
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
			return;
		}

		setDuration(parsedDuration);
		setMaxMoney(parsedMoney);
		setIsGlobalPlaying(true);
	};
	return {
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
	};
}
