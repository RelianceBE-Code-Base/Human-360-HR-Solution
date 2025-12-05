/**
 * AllKPIs Component
 *
 * This component renders the KPI Management page, including:
 * - Filter controls for Department, Status, Year, and Search
 * - Dynamic statistics cards (Total KPIs, At Risk, Achieved, Departments)
 * - A list of all KPIs (filtered based on user selections)
 *
 * It uses React state to manage:
 * - `allKpis`: the master list of all KPIs
 * - `filteredKpis`: the currently visible KPIs after applying filters
 * - `filters`: the values of the filter inputs
 * - `statsData`: values for the summary statistics cards
 *
 * It also includes handlers for:
 * - Updating filter values (`handleFilterChange`)
 * - Clearing all filters (`handleClearFilters`)
 *
 * Dependencies:
 * - `useNavigate` from react-router-dom for navigating to KPI creation
 * - `KPIList` component for displaying the KPI table
 * - `StatsCard` for displaying summary statistics
 *
 * @component
 * @returns {TSX.Element} The KPI Management UI
 */

import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";
import { IStatsData } from "../../../../../../shared/types/IStatsData";
import StatsCard from "../../../../components/common/Card/StatsCard";
import KPIList from "../../../../../../webparts/goil/components/KPIList/KPIList";
import { useNavigate } from "react-router-dom";
import KPIs from "../../../../../../shared/constant/kpis";
import { IKPI } from "../../../../../../shared/types/IKPI";

const initialFilters = {
  department: "All Departments",
  status: "All Status",
  year: "2025",
  search: "",
};

const initialStats: IStatsData[] = [
  {
    label: "Total KPIs",
    icon: "BulletedList2",
    value: 0,
    iconColour: "orange",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "At Risk",
    icon: "IncidentTriangle",
    value: 0,
    iconColour: "danger",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Achieved",
    icon: "Trophy2Solid",
    value: 0,
    iconColour: "success",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Departments",
    icon: "Group",
    value: 0,
    iconColour: "info",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
];

const AllKPIs: React.FC = () => {
  const navigate = useNavigate();

  // 1. State for the complete, unfiltered list of KPIs
  const [allKpis, setAllKpis] = React.useState<IKPI[]>([]);

  // 2. State for the list of KPIs currently shown to the user
  const [filteredKpis, setFilteredKpis] = React.useState<IKPI[]>([]);

  // 3. State for the values of the filter inputs
  const [filters, setFilters] = React.useState(initialFilters);

  // 4. State for the dynamic summary statistics cards
  const [statsData, setStatsData] = React.useState<IStatsData[]>(initialStats);

  // --- Effect to fetch initial data ---
  React.useEffect(() => {
    // In a real app, you would fetch data from an API or SharePoint here
    const fetchedKpis = KPIs;
    setAllKpis(fetchedKpis);
    setFilteredKpis(fetchedKpis); // Initially, show all KPIs
  }, []);

  // --- Effect to update the summary stat cards whenever the master KPI list changes ---
  React.useEffect(() => {
    if (allKpis.length > 0) {
      const total = allKpis.length;
      const atRisk = allKpis.filter((kpi) => kpi.status === "At Risk").length;
      const achieved = allKpis.filter(
        (kpi) => kpi.status === "Achieved"
      ).length;
      const departments = new Set(allKpis.map((kpi) => kpi.department)).size;

      setStatsData([
        { ...initialStats[0], value: total },
        { ...initialStats[1], value: atRisk },
        { ...initialStats[2], value: achieved },
        { ...initialStats[3], value: departments },
      ]);
    }
  }, [allKpis]);

  // --- Effect to apply filters whenever the 'filters' state or master 'allKpis' list changes ---
  React.useEffect(() => {
    let filteredData = [...allKpis];

    // Apply department filter
    if (filters.department !== "All Departments") {
      filteredData = filteredData.filter(
        (kpi) => kpi.department === filters.department
      );
    }
    // Apply status filter
    if (filters.status !== "All Status") {
      filteredData = filteredData.filter(
        (kpi) => kpi.status === filters.status
      );
    }
    // Apply year filter
    if (filters.year !== "All Year") {
      filteredData = filteredData.filter((kpi) => {
        if (!kpi.timelineStart) return false;

        // Get the year from startDate and compare it to the filter's year (which is a string)
        const kpiYear = new Date(kpi.timelineStart).getFullYear().toString();
        return kpiYear === filters.year;
      });
    }
    // Apply search filter (case-insensitive)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredData = filteredData.filter((kpi) =>
        kpi.objective.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredKpis(filteredData);
    console.log(filteredData);
  }, [filters, allKpis]);

  // --- Handler to update filter state ---
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // --- Handler to clear all filters ---
  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  // --- Derive unique departments for the dropdown using useMemo for efficiency ---
  const uniqueDepartments = React.useMemo(() => {
    return Array.from(new Set(allKpis.map((kpi) => kpi.department)));
  }, [allKpis]);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>KPI Management</h1>
          <p className="text-muted mb-3">
            View and manage all Key Performance Indicators
          </p>
        </div>

        <Button onClick={() => navigate("/kpis/kpi-create")}>
          <Icon iconName="add" />
          Create New KPI
        </Button>
      </div>

      <Card title="Filters">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="filterDept">Department</label>
            <select
              id="filterDept"
              name="department"
              className="form-control"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option>All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterStatus">Status</label>
            <select
              id="filterStatus"
              name="status"
              className="form-control"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option>All Status</option>
              <option>On Track</option>
              <option>Achieved</option>
              <option>At Risk</option>
              <option>Draft</option>
              <option>Pending Approval</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterYear">Year</label>
            <select
              id="filterYear"
              name="year"
              className="form-control"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option>All Year</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterSearch">Search</label>
            <input
              id="filterSearch"
              name="search"
              type="search"
              placeholder="Search Objectives..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group" style={{ alignSelf: "flex-end" }}>
            <Button
              variant="secondary"
              htmlId="clearFilters"
              size="sm"
              onClick={handleClearFilters}
            >
              <Icon iconName="Clear" />
              Clear
            </Button>
          </div>
        </div>
      </Card>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconColour={stat.iconColour}
            change={stat.change}
          />
        ))}
      </div>

      <Card title="All KPIs">
        <div className="chart-container">
          {/* --- Pass the DYNAMIC filteredKpis list to the component --- */}
          {console.log(filteredKpis)}
          <KPIList kpis={filteredKpis} onDelete={() => {}} onEdit={() => {}} />
        </div>
      </Card>
    </section>
  );
};

export default AllKPIs;
