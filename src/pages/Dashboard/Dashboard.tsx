import React from 'react';
import DefaultLayout from '../../layout/DefaultLoayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';


const MyDashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Home Page" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        

      </div>
    </DefaultLayout>
  );
};

export default MyDashboard;
