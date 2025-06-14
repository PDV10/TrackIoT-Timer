import { Box, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

type Props = {
	isVisible: boolean;
};

export default function SplashScreen({ isVisible }: Props) {
	return (
		<AnimatePresence>
			{isVisible && (
				<MotionBox
					position="fixed"
					top={0}
					left={0}
					right={0}
					bottom={0}
					zIndex={9999}
					display="flex"
					alignItems="center"
					justifyContent="center"
					bg="rgba(255, 255, 255, 0.95)"
					backdropFilter="blur(25px)"
					initial={{ scale: 1, opacity: 1 }}
					animate={{
						scale: [1, 10, 1000],
						opacity: [1, 1, 0],
					}}
					transition={{
						duration: 4.5,
						ease: "easeIn",
						times: [0, 0.6, 1],
					}}
					pointerEvents="none"
				>
					<Image
						src="/assets/trackiot_logo.png"
						alt="Logo"
						boxSize="120px"
						objectFit="contain"
					/>
				</MotionBox>
			)}
		</AnimatePresence>
	);
}
