export interface IStatsData {
  icon: string;
  label: string;
  value: number;
  iconColour: "success" | "warning" | "info" | "orange" | "danger";
  change: {
    description: string;
    type: "positive" | "negative" | "neutral";
    icon: string;
  };
}
