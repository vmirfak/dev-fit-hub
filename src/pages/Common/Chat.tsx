import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLoayout";
import ChatCard from "../../components/Chat/ChatCard";

const Chat = () => {
  const [isOpen] = useState(false);

  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="Chat" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ChatCard></ChatCard>
      </div>
    </DefaultLayout>
  );
};

export default Chat;
