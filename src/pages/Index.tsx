import React, { useState } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import FunnelCountCard from '../components/Dashboard/FunnelCountCard';
import SourcesPieChart from '../components/Dashboard/SourcesPieChart';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import StatsGrid from '../components/Dashboard/StatsGrid';

// Define the type for the active tab in PageHeader, based on its props
type DashboardTab = 'Sales' | 'Leads';

/**
 * DashboardOverviewPage serves as the main view for the lead tracking dashboard.
 * It assembles various analytical components within the MainAppLayout.
 * 
 * - PageHeader: Allows switching between 'Sales' and 'Leads' views and selecting time periods.
 * - FunnelCountCard & SourcesPieChart: Displayed side-by-side in a responsive grid, showing lead funnel stats and sources.
 * - LeadsTrackingChart: A full-width chart tracking lead conversion over time.
 * - StatsGrid: Shows reasons for lost leads and other key metrics.
 */
const DashboardOverviewPage: React.FC = () => {
  // State for managing the active tab in the PageHeader ('Sales' or 'Leads')
  // Defaulting to 'Leads' as per typical dashboard focus and component defaults.
  const [activeTab, setActiveTab] = useState<DashboardTab>('Leads' as const);

  // The MainAppLayout provides the overall structure including sidebar and top header.
  // Children of MainAppLayout are rendered in the main content area which has padding,
  // margin-top for the fixed header, and a flex-column layout with gap.
  return (
    <MainAppLayout>
      {/* PageHeader for selecting view type (Sales/Leads) and date range */}
      <PageHeader 
        activeTab={activeTab} 
        onTabChange={setActiveTab} // Directly pass the state setter for tab changes
      />
      
      {/* Section for FunnelCountCard and SourcesPieChart */}
      {/* Arranged in a responsive grid: 2 columns on large screens, 1 column on smaller screens */}
      {/* This corresponds to the 'mainContent.container' layout requirement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FunnelCountCard />
        <SourcesPieChart />
      </div>
      
      {/* LeadsTrackingChart, typically presented as a full-width element */}
      <LeadsTrackingChart />
      
      {/* StatsGrid for additional data points, also typically full-width */}
      {/* The StatsGrid component itself manages its internal grid layout */}
      <StatsGrid />
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
