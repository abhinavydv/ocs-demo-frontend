import { Box, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import { NavigateBefore, NavigateNext} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

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

const makeColorLighter = (color, percent) => {
    var num = parseInt(color.slice(1), 16),
    R = (num >> 16),
    G = ((num >> 8) & 0x00FF),
    B = (num & 0x0000FF);

    R += (255 - R) * percent / 100 | 0;
    G += (255 - G) * percent / 100 | 0;
    B += (255 - B) * percent / 100 | 0;

    console.log("#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1));
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

const Event = ({event, isMeal, meal, curDate, hour}) => {
    const today = curDate;
    var startTime, endTime;
    if (event){
        startTime = dayjs(event.start_date + " " + event.start_time)
        endTime = dayjs(event.end_date + " " + event.end_time)

        var start = dayjs(today.format("YYYY-MM-DD") + " " + hour + ":00:00");
        var end = dayjs(today.format("YYYY-MM-DD") + " " + (parseInt(hour)+1) + ":00:00");

        if (startTime < start){
            startTime = start;
        }
        if (endTime > end){
            endTime = end;
        }
    }

    return <Box sx={{
        display: "flex",
        minHeight: 45,
        flexDirection: "row",
    }}>
        <Box>
            <Box sx={{minHeight: "25%", minWidth: 15, display: "flex"}}>
                <Box sx={{borderTop: 1, borderRight: 1, width: "100%", borderColor: "#CCCCCC"}}></Box>
            </Box>
            <Box sx={{minHeight: "25%", minWidth: 15, display: "flex"}}>
                <Box sx={{borderTop: 1, borderRight: 1, width: "100%", borderColor: "#CCCCCC"}}></Box>
            </Box>
            <Box sx={{minHeight: "25%", minWidth: 15, display: "flex"}}>
                <Box sx={{borderTop: 1, borderRight: 1, width: "100%", borderColor: "#CCCCCC"}}></Box>
            </Box>
            <Box sx={{minHeight: "25%", minWidth: 15, display: "flex"}}>
                <Box sx={{borderTop: 1, borderRight: 1, width: "100%", borderColor: "#CCCCCC"}}></Box>
            </Box>
        </Box>
        <Box sx={{paddingX: 3, width: "100%", display: "flex", paddingY: 0.1}}>
            {event &&
                <Box sx={{borderRadius: 2, paddingX: 0.4, backgroundColor: makeColorLighter(event.color, 70), width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
                    <Box sx={{border: 1.5, marginY: 0.4, borderColor: event.color, marginRight: 2}}></Box>
                    <Box sx={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{alignItems: "center", fontSize: 12, fontWeight: 500}}>
                            {event.title}
                        </Typography>
                        <Box flexGrow={1}/>
                        <Typography sx={{alignItems: "center", fontSize: 10, fontWeight: 500, marginRight: 3}}>
                            {startTime.format("HH:mm") + " - " + endTime.format("HH:mm")}
                        </Typography>
                        <Typography sx={{alignItems: "center", fontSize: 10, fontWeight: 500, width: 50}}>
                            {calcTime(event.start_date + " " + event.start_time, event.end_date + " " + event.end_time)}
                        </Typography>
                        <Box display={"flex"} component={"img"} src="/HandPointing.jpg" height={30}/>
                    </Box>
                </Box>
            }
        </Box>
    </Box>
}

const Hour = ({hour, events, curDate}) => {
    return <Box sx={{
        display: "flex",
        width: "100%",
    }}>
        <Box sx={{width: 40, color: "#AAAAAA", paddingRight: 1}}>
            <Typography sx={{width: "100%", textAlign: "right", marginTop: -1, fontSize: 12}}>
                {hour + ":00"}
            </Typography>
        </Box>
        <Box sx={{width: "100%", display: "flex", flexDirection: "column"}} >
            {events.map((event, i) => {
                return <Event key={i} event={event} hour={hour} curDate={curDate}/>
            })}
            {events.length === 0 && <Event />}
        </Box>
    </Box>
}

export const DayView = ({date, events, setDate}) => {
    var eventByHours = {};
    const today = date.format("YYYY-MM-DD");
    for (var i = 6; i < 24; i++) {
        eventByHours[i] = [];

        var timeNow = dayjs(today + " " + i + ":00:00");
        var timeNext = dayjs(today + " " + (i+1) + ":00:00");

        for (var j = 0; j < events.length; j++) {
            var event = events[j];
            var eventStart = dayjs(event.start_date + " " + event.start_time);
            var eventEnd = dayjs(event.end_date + " " + event.end_time);

            if (timeNow.isBetween(eventStart, eventEnd, "minute") || timeNext.isBetween(eventStart, eventEnd, "minute") || eventStart.isBetween(timeNow, timeNext, "minute") || eventEnd.isBetween(timeNow, timeNext, "minute")){
                eventByHours[i].push(event);
            }
        }
    }

    // console.log(eventByHours);

    return <Box>
        <Box sx={{marginRight: 2}}>
            <Box sx={{
                display: "flex",
                alignContent: "center",
                flexDirection: "row",
            }}>
                <Typography sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    alignSelf: "center",
                }}>
                    {date.format("DD MMMM")}
                </Typography>

                <Box flexGrow={1} />
                <Stack
                    sx={{
                        alignSelf: "right",
                    }}
                    direction={"row"}
                >
                    <IconButton onClick={() => {
                        setDate(date.add(-1, "day"));
                    }}>
                        <NavigateBefore/>
                    </IconButton>
                    <IconButton onClick={() => {
                        setDate(date.add(1, "day"));
                    }} >
                        <NavigateNext />
                    </IconButton>
                </Stack>
            </Box>
            <Divider sx={{marginY: 1}}/>
        </Box>
        <Box>
            {Object.keys(eventByHours).map((hour) => {
                return <Hour hour={hour} events={eventByHours[hour]} key={hour} curDate={date}/>
            })}
        </Box>
    </Box>
}
