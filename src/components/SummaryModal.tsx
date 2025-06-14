import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";

type PanelResult = {
  time: number;
  money: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  panel1: PanelResult;
  panel2: PanelResult;
};

export default function SummaryModal({
  isOpen,
  onClose,
  panel1,
  panel2,
}: Props) {
  const efficiency1 = panel1.time > 0 ? panel1.money / panel1.time : 0;
  const efficiency2 = panel2.time > 0 ? panel2.money / panel2.time : 0;

  const isEqual = Math.abs(efficiency1 - efficiency2) < 0.01;

  const winner =
    !isEqual
      ? efficiency1 > efficiency2
        ? "Panel 1"
        : "Panel 2"
      : null;

  const percentDiff = !isEqual
    ? (Math.abs(efficiency1 - efficiency2) / Math.min(efficiency1, efficiency2)) * 100
    : 0;

  const verdict = winner
    ? `🏆 ${winner} fue más eficiente en un ${percentDiff.toFixed(1)}% comparado con el otro panel.`
    : "🤝 Ambos paneles tuvieron el mismo rendimiento.";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent bg="white" rounded="xl" shadow="xl">
        <ModalHeader textAlign="center">Resumen comparativo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={5} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="lg">Panel 1</Text>
              <Text fontWeight="bold" fontSize="lg">Panel 2</Text>
            </HStack>

            <HStack justify="space-between">
              <Text>⏱ Tiempo: {panel1.time.toFixed(1)}s</Text>
              <Text>⏱ Tiempo: {panel2.time.toFixed(1)}s</Text>
            </HStack>

            <HStack justify="space-between">
              <Text>💰 Dinero: ${panel1.money.toFixed(0)}</Text>
              <Text>💰 Dinero: ${panel2.money.toFixed(0)}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text>📊 Rendimiento: ${efficiency1.toFixed(3)}/s</Text>
              <Text>📊 Rendimiento: ${efficiency2.toFixed(3)}/s</Text>
            </HStack>

            <Text textAlign="center" pt={4} fontWeight="medium">
              {verdict}
            </Text>

            <Button
              colorScheme="teal"
              variant="outline"
              onClick={onClose}
              alignSelf="center"
            >
              Cerrar resumen
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
