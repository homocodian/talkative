import { ColorSwatchIcon as LogoIcon } from "@heroicons/react/solid";
import {
  HomeIcon,
  VideoCameraIcon as VideoIcon,
  BellIcon,
  ChatIcon,
  UserIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconFilled,
  VideoCameraIcon as VideoIconFilled,
  BellIcon as BellIconFilled,
  ChatIcon as ChatIconFilled,
  UserIcon as UserIconFilled,
} from "@heroicons/react/solid";
import Image from "next/image";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const activeTab = useSelector((state) => state.navReducer.activeTab);
  const dispatch = useDispatch();

  const handleTabButtonClick = (text) => {
    dispatch({
      type: "CHANGE_ACTIVE_TAB",
      payload: text,
    });
  };

  return (
    <div className="w-16 sm:w-20 min-h-screen py-10 flex flex-col justify-between items-center border-r-[1.5px] border-gray-200">
      <div>
        <LogoIcon className="h-7 w-7 text-orange-300" />
      </div>
      <div className="flex flex-col justify-between items-center">
        <IconButton
          text="home"
          activeTab={activeTab}
          onPress={handleTabButtonClick}
          Icon={activeTab !== "home" ? HomeIcon : HomeIconFilled}
        />
        <IconButton
          text="meeting"
          activeTab={activeTab}
          onPress={handleTabButtonClick}
          Icon={activeTab !== "meeting" ? VideoIcon : VideoIconFilled}
        />
        <IconButton
          showBadge
          text="notification"
          activeTab={activeTab}
          onPress={handleTabButtonClick}
          Icon={activeTab !== "notification" ? BellIcon : BellIconFilled}
        />
        <IconButton
          text="chat"
          activeTab={activeTab}
          onPress={handleTabButtonClick}
          Icon={activeTab !== "chat" ? ChatIcon : ChatIconFilled}
        />
        <IconButton
          text="user"
          activeTab={activeTab}
          onPress={handleTabButtonClick}
          Icon={activeTab !== "user" ? UserIcon : UserIconFilled}
        />
      </div>
      <div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="porfile"
            objectFit="cover"
            width={34}
            height={34}
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
