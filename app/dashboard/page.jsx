import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

import DashboardHero from '@/components/DashBoardHero'

function Dashboard() {
  return (
    <div className="p-10">

      <DashboardHero />

     

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      <InterviewList />

    </div>
  );
}

export default Dashboard;