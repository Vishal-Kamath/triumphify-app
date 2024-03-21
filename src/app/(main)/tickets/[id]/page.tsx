import { FC } from "react";
import TicketSidebar from "./ticket-sidebar";
import TicketChatWindow from "./tickets-chat-window";

const TicketPage: FC = () => {
  return (
    <main className="relative isolate mx-auto flex w-full max-w-6xl items-start gap-12 p-3 py-6 max-md:flex-col-reverse">
      <TicketSidebar />
      <TicketChatWindow />
    </main>
  );
};

export default TicketPage;
