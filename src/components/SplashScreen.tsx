// components/SplashScreen.tsx
import { Box, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

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
					bg="rgba(255, 255, 255, 0.9)"
					backdropFilter="blur(25px)"
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 2.5, ease: "easeInOut" }}
				>
					<MotionImage
						src="/assets/trackiot_logo.png"
						alt="Logo"
						boxSize="140px"
						objectFit="contain"
						initial={{ scale: 1 }}
						animate={{ scale: 2000 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 10, ease: "easeIn" }}
					/>
				</MotionBox>
			)}
		</AnimatePresence>
	);
}
