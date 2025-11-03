// /frontend/app/organisation/dashboard/_components/data.tsx

import {
  IoChatbubbleEllipsesSharp,
  IoInformationCircleSharp,
  IoTicket,
  IoRefresh,
} from "react-icons/io5";
import {
  MdMarkChatUnread,
  MdContentCopy,
  MdImage,
  MdDelete,
} from "react-icons/md";
import { BiSolidMessageError } from "react-icons/bi";
import { FaBookOpen, FaYoutube, FaUserCog } from "react-icons/fa";
import { PiUserSoundFill } from "react-icons/pi";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { LuUnplug } from "react-icons/lu";
import { IoIosCode } from "react-icons/io";
import { TbServerBolt } from "react-icons/tb";
import { ImQrcode } from "react-icons/im";

export const dashboardCardData = [
  {
    id: 1,
    title: "All Chats",
    count: 17624,
    icon: <IoChatbubbleEllipsesSharp className="size-5" />,
    actionIcons: [
      { type: "info", icon: <IoInformationCircleSharp className="size-4" /> },
    ],
  },
  {
    id: 2,
    title: "Unread Chats",
    count: 338,
    icon: <MdMarkChatUnread className="size-5" />,
  },
  {
    id: 3,
    title: "Flagged Chats",
    count: 50,
    icon: <BiSolidMessageError className="size-5 text-destructive" />,
    actionIcons: [
      { type: "docs", icon: <FaBookOpen className="size-4" /> },
      { type: "video", icon: <FaYoutube className="size-4" /> },
    ],
  },
];

export const cardData = [
  {
    icon: <PiUserSoundFill className="size-4" />,
    title: "Bulk messages",
    description: "Send or schedule customized bulk messages",
  },
  {
    icon: <FaUserCog className="size-4" />,
    title: "Manage Team",
    description: "Add / remove team members and manage access to chats",
  },
  {
    icon: <BsFillTelephonePlusFill className="size-4" />,
    title: "Add Phones",
    description: "Connect multiple WhatsApp numbers to Cheentak",
  },
  {
    icon: <IoTicket className="size-4" />,
    title: "Manage tickets",
    description: "Create tickets from your WA messages with an emoji",
  },
  {
    icon: <LuUnplug className="size-4" />,
    title: "Integrate your tools",
    description:
      "Link Cheentak account to HubSpot / Freshdesk / GSheets / Zohodesk",
  },
  {
    icon: <IoIosCode className="size-4" />,
    title: "APIs & Webhooks",
    description: "Build custom automations using our APIs and webhooks",
  },
];

export const firstPhoneOptions = [
  { id: 1, icon: <MdContentCopy className="size-4" />, title: "Copy phone id" },
  { id: 2, icon: <MdImage className="size-4" />, title: "Update image" },
  { id: 3, icon: <IoRefresh className="size-4" />, title: "Refresh status" },
];

export const secondPhoneOptions = [
  { id: 6, icon: <TbServerBolt className="size-4" />, title: "Switch server" },
  { id: 7, icon: <ImQrcode className="size-4" />, title: "Reset phone" },
  { id: 8, icon: <MdDelete className="size-4" />, title: "Delete phone" },
];

export const phoneStatusData = [
  {
    id: 1,
    number: "+91 76050 19991",
    name: "Cheenta Support - Taniya Das",
    label: "+ Label",
    status: "Restart",
    statusColor: "red",
  },
  {
    id: 2,
    number: "+91 76050 19993",
    name: "Cheenta Support - Ayshareeya Dutta",
    label: "+ Label",
    status: "Connected",
    statusColor: "green",
  },
];
