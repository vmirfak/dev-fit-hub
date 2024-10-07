import React from 'react';
import DefaultLayout from '../../layout/DefaultLoayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const MyDashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Home Page" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div >

        </div>
      </div>
    </DefaultLayout>
  );
    };

export default MyDashboard;
