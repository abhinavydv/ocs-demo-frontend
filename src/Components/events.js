import { Box, Typography, Divider } from "@mui/material";
import dayjs from "dayjs";

const calcTime = (start, end, curDate) => {
    var hrs = Math.abs(dayjs(start).diff(dayjs(end), "hours"));
    var mins = Math.abs(dayjs(start).diff(dayjs(end), "minutes")) % 60;

    hrs = (hrs>0 && ((hrs > 24 && "> 24") || hrs)+" hrs") || "";
    mins = (mins>0 && mins+" mins") || "";

    if (hrs || mins)
        return hrs + " " + mins;
    else
        return "< 1 min"
}

const Event = ({event, curDate}) => {

    return <Box sx={{
        display: "flex",
        width: "100%",
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingY: 0.5,
        }}>
            <Box width="min-content" display={"flex"}>
                <Box sx={{
                    width: 20,
                    height: 20,
                    borderRadius: 1,
                    backgroundColor: event.color,
                    marginRight: 1,
                }}/>
            </Box>
            <Box width="75%">
                <Typography sx={{
                    fontSize: 12,
                    fontWeight: "bold",
                }}>
                    {event.title}
                </Typography>
            </Box>
            <Box alignSelf={"right"}>
                <Typography fontSize={12} align="right">{calcTime(event.start_date + " " + event.start_time, event.end_date + " " + event.end_time, curDate)}</Typography>
            </Box>
        </Box>
    </Box>
}

export const EventsToday = ({events}) => {
    return <Box>
        <Typography sx={{
            fontSize: 16,
            fontWeight: "bold",
            alignSelf: "center",
        }}>
            Events Today
        </Typography>
        <Divider sx={{marginBottom: 1}} />
        {events.map(event => (<Event event={event} key={event.id}/>))}
        {events.length === 0 && <Typography>No events today</Typography>}
    </Box>
}
