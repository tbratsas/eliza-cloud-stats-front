// components/DateRangeFilter.tsx
import * as React from "react";
import { Stack, Button } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { el } from "date-fns/locale";
import { useState } from "react";

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface DateRangeFilterProps {
    onChange: (range: DateRange) => void;
    initialValue?: DateRange;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    onChange,
    initialValue,
}) => {
    const [startDate, setStartDate] = useState<Date | null>(
        initialValue?.startDate || null
    );
    const [endDate, setEndDate] = useState<Date | null>(
        initialValue?.endDate || null
    );

    const handleApply = () => {
        if (startDate && endDate && startDate > endDate) {
            alert("Η ημερομηνία έναρξης δεν μπορεί να είναι μετά την ημερομηνία λήξης!");
            return;
        }

        onChange({ startDate, endDate });
    };

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Από"
                maxDate={endDate || undefined}
                timeIntervals={15}
                locale={el}
            />

            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Έως"
                minDate={startDate || undefined}
                timeIntervals={15}
                locale={el}
            />
            <Button variant="contained"
                onClick={handleApply}
                disabled={!startDate || !endDate}>
                Εφαρμογή
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                    onChange({ startDate: null, endDate: null }); // triggers parent to refetch all
                }}
            >
                Καθαρισμός
            </Button>

        </Stack>
    );
};
