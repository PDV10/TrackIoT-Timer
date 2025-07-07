import { Box, VStack, IconButton, Flex } from "@chakra-ui/react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Label,
} from "recharts";
import { useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

type PanelResult = {
	time: number;
	money: number;
};

type Props = {
	panel1: PanelResult;
	panel2: PanelResult;
};

const donutColors = ["#8884d8", "#82ca9d"];

export default function ComparisonChart({ panel1, panel2 }: Props) {
	const [chartIndex, setChartIndex] = useState(0);

	const chartLabels = [
		"📈 Costo en el tiempo",
		"📊 Comparación general",
		"🍩 Distribución del costo",
	];

	const maxIndex = chartLabels.length - 1;

	const handleNext = () =>
		setChartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
	const handlePrev = () =>
		setChartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));

	const lineData = Array.from({ length: 5 }, (_, i) => ({
		Tiempo: `${(i + 1) * 10}s`,
		"Manual ($)": (panel1.money / 5) * (i + 1),
		"TrackIoT ($)": (panel2.money / 5) * (i + 1),
	}));

	const barData = [
		{ name: "Tiempo (segundos)", Manual: panel1.time, TrackIoT: panel2.time },
		{ name: "Costo (pesos)", Manual: panel1.money, TrackIoT: panel2.money },
	];

	const pieData = [
		{ name: "Manual", value: panel1.money },
		{ name: "TrackIoT", value: panel2.money },
	];

	return (
		<VStack w="full">
			<Flex w="full" align="center" justify="space-between">
				<IconButton
					aria-label="Anterior"
					icon={<ArrowBackIcon />}
					onClick={handlePrev}
					variant="ghost"
					size="lg"
				/>
				<Box w="90%" h="300px">
					<ResponsiveContainer width="100%" height="100%">
						{chartIndex === 0 ? (
							<LineChart data={lineData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="Tiempo" />
								<YAxis>
									<Label
										angle={-90}
										position="insideLeft"
										style={{ textAnchor: "middle" }}
									>
										Costo ($)
									</Label>
								</YAxis>
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="Manual ($)"
									stroke="#8884d8"
									strokeWidth={2}
								/>
								<Line
									type="monotone"
									dataKey="TrackIoT ($)"
									stroke="#82ca9d"
									strokeWidth={2}
								/>
							</LineChart>
						) : chartIndex === 1 ? (
							<BarChart data={barData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="Manual" fill="#8884d8" name="Manual" />
								<Bar dataKey="TrackIoT" fill="#82ca9d" name="TrackIoT" />
							</BarChart>
						) : (
							<PieChart>
								<Pie
									data={pieData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={80}
									label={(entry) => `${entry.name}: $${entry.value}`}
								>
									{pieData.map((entry) => (
										<Cell
											key={`cell-${entry.name}`}
											fill={
												donutColors[
													pieData.findIndex((e) => e.name === entry.name) %
														donutColors.length
												]
											}
										/>
									))}
								</Pie>
								<Tooltip formatter={(value: number) => `$${value}`} />
								<Legend />
							</PieChart>
						)}
					</ResponsiveContainer>
				</Box>
				<IconButton
					aria-label="Siguiente"
					icon={<ArrowForwardIcon />}
					onClick={handleNext}
					variant="ghost"
					size="lg"
				/>
			</Flex>
		</VStack>
	);
}
