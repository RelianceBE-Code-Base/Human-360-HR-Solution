/**
 * Represents a single statistics card data model used in dashboards.
 *
 * @property {string} icon - The icon name or identifier displayed on the stats card.
 * @property {string} label - Descriptive label of the statistic.
 * @property {number} value - Numeric value being displayed.
 * @property {"success" | "warning" | "info" | "orange" | "danger"} iconColour
 *  Colour variant used for the icon to visually indicate state or priority.
 * @property {Object} change - Details about how the value has changed.
 * @property {string} change.description - Text describing the change (e.g., "+12% this month").
 * @property {"positive" | "negative" | "neutral"} change.type
 *  Indicates whether the change is good, bad, or neutral.
 * @property {string} change.icon - Icon representing the direction or type of change.
 */
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
