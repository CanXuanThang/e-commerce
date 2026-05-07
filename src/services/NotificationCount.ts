import { getIO } from "../config/socket";
import { NotificationCount } from "../models/NotificationCount";

const updateCount = async () => {
  await NotificationCount.increment("count", {
    by: 1,
    where: {
      id: 1,
    },
  });

  const updatedCount = await NotificationCount.findByPk(1);

  return updatedCount?.count;
};

const resetCount = async () => {
  const countNoti = await NotificationCount.findByPk(1);

  const io = getIO();

  io.to("admin_room").emit("notification_count_updated", {
    message: "",
    count: 0,
  });

  return countNoti?.update({ count: 0 });
};

const getCount = async () => {
  const countNoti = await NotificationCount.findByPk(1);

  return countNoti?.count ?? 0;
};

export const notificationCount = { updateCount, resetCount, getCount };
