import dayjs from"dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

export const caluclatime = (item,setPostTime)=>{
dayjs.extend(relativeTime); 

  const milliseconds = item.time?.seconds * 1000 + Math.floor(item.time?.nanoseconds / 1e6);
  const formattedDate = dayjs(milliseconds).format('YYYY-MM-DD HH:mm:ss');
  const now = dayjs();
  const isWithinOneDay = dayjs(formattedDate).isAfter(now.subtract(1, 'day'));

  if (isWithinOneDay) {
    // Display relative time
    setPostTime(dayjs(formattedDate).fromNow());
  } else {
    // Display real time and date
    setPostTime(formattedDate);
  }
} 