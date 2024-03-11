import { Box, Button, Card, Checkbox, TextField, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material";
import { TitleBar } from "./titlebar";
import { useEffect, useState } from "react";
import { BACKEND_HOST } from "../config";
import axios from "axios";
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import dayjs from "dayjs";
import { EventsToday } from "./events";
import { CalendarView } from "./calendarView";
import { DayView } from "./dayView";
import { NavigateBefore, Search, Settings, RadioButtonUnchecked, RadioButtonCheckedOutlined } from "@mui/icons-material";

dayjs.extend(isBetweenPlugin);

const getEventCounts = (events, start, end) => {
    var counts = {};
    var i;
    for (i=start; i<=end; i=i.add(1, "day")){
        counts[i.format("YYYY-MM-DD")] = 0;
    }

    for (i=0; i<events.length; i++){
        var startDate = dayjs(events[i].start_date);
        var endDate = dayjs(events[i].end_date);

        for (var j=startDate; j<=endDate; j=j.add(1, "day")){
            if (j.isBetween(start, end, "day", "[]")){
                counts[j.format("YYYY-MM-DD")] += 1;
            }
        }
    }

    return counts;
}

export const Calendar = () => {
    const [events, setEvents] = useState([]);

    const [eventCount, setEventCount] = useState({});
    const [curDate, setCurDate] = useState(dayjs(Date.now()));
    const [curMonth, setCurMonth] = useState(curDate.month());
    const [curYear, setCurYear] = useState(curDate.year());

    useEffect( () => {
        async function fetchEvents() {
            const response = await axios.get(`${BACKEND_HOST}/events/${curDate.format("YYYY-MM-DD")}`);

            setEvents(response.data.events);
        }
        fetchEvents();
    }, [curDate]);

    useEffect( () => {
        async function fetchEventCount() {
            const cur = dayjs([curYear, curMonth+1, 1]);
            const start = cur.subtract(1, "month");
            const end = cur.add(2, "month").subtract(1, "day");

            const response = await axios.get(`${BACKEND_HOST}/eventcount/${start.format("YYYY-MM-DD")}/${end.format("YYYY-MM-DD")}`);

            if (response.data.events){
                const counts = getEventCounts(response.data.events, start, end);
                setEventCount(counts);
            }
        }
        fetchEventCount();
    }, [curMonth, curYear]);

    const onChange = (e) => {
        setCurDate(e);
    }

    const onMonthChange = (e) => {
        setCurMonth(e.month());
        setCurYear(e.year());
    }

    return (
        <Box sx={{
            padding: 2,
            backgroundColor: "#EEEEEE",
        }}>
            <TitleBar/>
            <Box display={"flex"} sx={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
            }}>
                <IconButton sx={{width: 20, height: 20, marginRight: 1}}> <NavigateBefore /> </IconButton>
                <Typography sx={{fontWeight: 500, fontSize: 14}}>
                    Calendar
                </Typography>
                <Box flexGrow={1}/>
                <Card sx={{boxShadow: 2, borderRadius: 2, marginRight: 2}}>
                    <TextField
                        sx={{
                            width: 200,
                            height: 21,
                            fontSize: 8,
                            marginBottom: 1,
                            marginLeft: 1,
                        }}
                        placeholder="Search Calendar"
                        variant="standard"
                        InputProps={{
                            startAdornment: <Search color="black" sx={{height: 20}} />,
                            classes: {input: {fontSize: 10}}
                        }}
                    />
                </Card>
                <Card sx={{boxShadow: 2, borderRadius: 2, marginRight: 2}}>
                    <FormGroup>
                        <FormControlLabel
                            sx={{height: 25, fontSize: 12}}
                            control={<Checkbox sx={{height: 15}} icon={<RadioButtonUnchecked sx={{fontSize: 15, marginLeft: 1}}/>} checkedIcon={<RadioButtonCheckedOutlined sx={{fontSize: 15, marginLeft: 1}}/>}/>}
                            label={<Typography fontSize={10} fontWeight={500}>Show registered events only</Typography>}
                        />
                    </FormGroup>
                </Card>
                <Card sx={{boxShadow: 2, borderRadius: 2}}>
                    <Button sx={{color: "black", fontSize: 10, height: 25}} startIcon={<Settings color="white"/>}> Options </Button>
                </Card>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    marginTop: 2,
                    width: "100%",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        marginRight: 3,
                        marginLeft: 1
                    }}
                >
                    <Card sx={{
                        boxShadow: 2,
                        width: "100%",
                        paddingLeft: 2,
                        paddingTop: 1,
                    }}>
                        <DayView date={curDate} events={events} setDate={setCurDate}/>
                    </Card>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        alignSelf: "right",
                        justifySelf: "right"
                    }}
                >
                    <Card sx={{
                        boxShadow: 2,
                        width: "fit-content",
                        marginBottom: 2,
                    }}>
                        <CalendarView
                            curDate={curDate}
                            eventCount={eventCount}
                            onMonthChange={onMonthChange}
                            onChange={onChange}
                        />
                    </Card>
                    <Card sx={{
                        boxShadow: 2,
                        width: "100%",
                    }}>
                        <Box sx={{
                            margin: 2,
                        }}>
                            <EventsToday events={events} />
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
