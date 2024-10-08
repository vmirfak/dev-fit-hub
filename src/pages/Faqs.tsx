import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLoayout';

const FAQ = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="FAQs" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      </div>
    </DefaultLayout>
  );
};

export default FAQ;
