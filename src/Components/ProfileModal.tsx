import { useRef, useEffect } from "react";
import { Eye, Rss, FileText, Settings, ClipboardList } from "lucide-react";
import {
  defaultUserProfile,
  profileMenuItems,
  officialCommunities,
} from "../data/profileData";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, any> = {
  Eye,
  Rss,
  ClipboardList,
  FileText,
  Settings,
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute right-0 top-full mt-3 w-[340px] bg-white border border-gray-200 shadow-lg rounded-xl z-50 overflow-hidden"
    >
      {/* === Header === */}
      <div className="bg-blue-50 p-4 flex flex-col gap-1 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
            {defaultUserProfile.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              Hello, {defaultUserProfile.name}
            </h3>
            <p className="text-xs text-gray-500">{defaultUserProfile.email}</p>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white mt-3 border rounded-md px-3 py-2 text-sm">
          <span>{defaultUserProfile.goal}</span>
          <button className="text-blue-500 hover:underline text-xs">✏️ Edit</button>
        </div>

        {!defaultUserProfile.isProfileComplete && (
          <p className="text-xs text-blue-600 mt-1 cursor-pointer">
            Your profile is incomplete —{" "}
            <span className="font-medium underline">Complete Now</span>
          </p>
        )}
      </div>

      {/* === Menu === */}
      <div className="p-3">
        <ul className="space-y-3 text-sm text-gray-700">
          {profileMenuItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li
                key={item.label}
                className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition"
              >
                <Icon size={16} />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* === Communities === */}
      <div className="border-t border-gray-200 p-3 bg-gray-50">
        <p className="text-sm font-semibold text-gray-800 mb-2">
          Ask Questions in Official Communities
        </p>
        <div className="space-y-2">
          {officialCommunities.map((community) => (
            <div
              key={community.title}
              className="border rounded-md p-2 text-sm hover:bg-orange-50 cursor-pointer"
            >
              <div className="font-medium">{community.title}</div>
              <p className="text-xs text-gray-500">{community.members} Members</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
