import { Box, Button, Divider, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersCalendarHeader} from "@mui/x-date-pickers";

const Dots = ({count, size, color, marginX}) => {
    var dots = []

    for (var i=0; i<count; i++){
        dots.push(<Box
            sx={{
                minWidth: size,
                minHeight: size,
                backgroundColor: color,
                borderRadius: size,
                marginX: marginX
            }}
            key={i}
        />)
    }

    return <Box sx={{display: "flex"}}>
        {dots}
    </Box>
}

const EventsPickersDay = ({numEvents, onChange, ...props}) => {
    // console.log(props.day.format("YYYY-MM-DD"))
    return <Box>
        <Box sx={{
            backgroundColor: ((props.selected && "black") || "white"),
            borderRadius: 1,
            display: "flex",
            flexDirection: "column"
        }}>
            {/* <PickersDay 
                {...props}
                disableHighlightToday
                selected={false}
                sx={{color: ((props.selected && "white") || "black")}}
            /> */}
            <Button
                sx={{
                    maxWidth: 38,
                    minWidth: 38,
                    height: 35,
                    marginX: 0.1,
                    textAlign: "center",
                    color: ((props.selected && "white") || "black"),
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                onClick={() => onChange(props.day)}
            >
                <Typography sx={{
                    lineHeight: 1.5,
                    fontSize: 10,
                    color: ((props.outsideCurrentMonth && "#BBBBBB") || undefined),
                    fontWeight: "bold"
                }}>
                    {props.day["$D"]}
                </Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Dots
                        count={numEvents}
                        color={((props.selected && "white") || "black")}
                        size={3}
                        marginX={0.1}
                    />
                </Box>
            </Button>
        </Box>
    </Box>
}

const EventCalendarHeader = ({date, ...props}) => {
    return <Box sx={{
        marginBottom: 1,
    }}>
        <PickersCalendarHeader
            {...props}
        />
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Divider
            sx={{
                width: "90%",
            }} />
        </Box>
    </Box>
}

export const CalendarView = ({ curDate, eventCount, onMonthChange, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={curDate}
            onChange={onChange}
            showDaysOutsideCurrentMonth
            onMonthChange={onMonthChange}
            slots={{
                day: EventsPickersDay,
                calendarHeader: EventCalendarHeader
            }}
            slotProps={{
                day: (props) => {return {numEvents: eventCount[props.day.format("YYYY-MM-DD")], onChange: onChange, ...props}},
            }}
            dayOfWeekFormatter={(dayOfWeek) => dayOfWeek}
          />
        </LocalizationProvider>
      );
}
