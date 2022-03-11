import React from "react";

function IconButton({ Icon, showBadge, count, text, activeTab, onPress }) {
  return (
    <button
      className="p-4 rounded-xl hover:bg-teal-50 cursor-pointer group"
      onClick={() => onPress(text)}
    >
      {showBadge ? (
        <BadgeIcon
          Icon={Icon}
          count={count}
          text={text}
          activeTab={activeTab}
        />
      ) : (
        <Icon
          className={`w-5 h-5 group-hover:text-teal-600 ${
            activeTab === text ? "text-teal-600" : "text-gray-400"
          }`}
        />
      )}
    </button>
  );
}

function BadgeIcon({ Icon, count, text, activeTab }) {
  return (
    <div className="relative">
      <Icon
        className={`w-5 h-5 group-hover:text-teal-600 ${
          activeTab === text ? "text-teal-600" : "text-gray-400"
        }`}
      />
      <span className="absolute top-0 right-0 rounded-full p-1 bg-red-400 flex justify-center items-center">
        {count ? count : ""}
      </span>
    </div>
  );
}

export default IconButton;
