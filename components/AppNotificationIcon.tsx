// 呼び出し例
// <NotificationIcon Icon={Mail} count={3} color="#EF4444" />
import React from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  count: number;
  color: string;
};

export const NotificationIcon: React.FC<Props> = ({ Icon, count, color }) => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <Icon className="w-6 h-6 text-gray-700" />
      <span
        className="absolute -top-1 -right-1 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
        style={{ backgroundColor: color }}
      >
        {count}
      </span>
    </div>
  );
};
