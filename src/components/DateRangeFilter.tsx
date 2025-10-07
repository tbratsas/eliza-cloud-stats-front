// components/DateRangeFilter.tsx
import * as React from "react";
import { Stack, Button, Box } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { el } from "date-fns/locale";
import { useEffect, useState } from "react";

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface DateRangeFilterProps {
    onChange: (range: DateRange) => void;
    initialValue?: DateRange;
    onReset?: () => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    onChange,
    initialValue,
    onReset
}) => {
    const startDate = initialValue?.startDate || null;
    const endDate = initialValue?.endDate || null;

    /*   const handleApply = () => {
          if (startDate && endDate && startDate > endDate) {
              alert("Η ημερομηνία έναρξης δεν μπορεί να είναι μετά την ημερομηνία λήξης!");
              return;
          }
          onChange({ startDate, endDate });
      }; */

    const [localRange, setLocalRange] = useState<DateRange>(initialValue ?? { startDate: null, endDate: null });

    const handleStartChange = (date: Date | null) => {
        setLocalRange((prev) => ({ ...prev, startDate: date }));
    };

    const handleEndChange = (date: Date | null) => {
        setLocalRange((prev) => ({ ...prev, endDate: date }));
    };

    const handleApplyClick = () => {
        if (localRange.startDate && localRange.endDate) {
            onChange(localRange); // ← triggers filtering
        }
    };

    useEffect(() => {
        setLocalRange(initialValue ?? { startDate: null, endDate: null });
    }, [initialValue]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                alignItems: "center",
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
            >
                <DatePicker
                    selected={localRange.startDate}
                    onChange={handleStartChange}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    placeholderText="Από"
                    maxDate={localRange.endDate || undefined}
                    timeIntervals={15}
                    locale={el}
                />
                <DatePicker
                    selected={localRange.endDate}
                    onChange={handleEndChange}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    placeholderText="Έως"
                    minDate={localRange.startDate || undefined}
                    timeIntervals={15}
                    locale={el}
                />
                <Button
                    variant="contained"
                    onClick={handleApplyClick}
                    disabled={!localRange.startDate || !localRange.endDate}
                >
                    Εφαρμογή
                </Button>
                {onReset && (
                    <Button variant="outlined" onClick={onReset}>
                        Καθαρισμός
                    </Button>
                )}
            </Stack>
        </Box>
    );
};
