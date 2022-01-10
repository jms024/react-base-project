import { useState, useEffect } from "react";

import useApi from "./useApi";
import { deepCopyObject } from "./general.util";

const shuffleShifts = (currentShift) => {
    switch (currentShift) {
        case 'morning':
            return 'afternoon';
        case 'afternoon':
            return 'night';
        case 'night':
            return 'morning';
        default:
            return 'morning';
    }
}

/*
* The algorithm assigns 1 break slot per 4 working slots. For the algorithm (and realistically) to work well, there
* must be at least 1 more presenter for every 4 tables per shift
*/
export default () => {
    const [tables, setTables] = useState(null),
        [presenters, setPresenters] = useState(null),
        api = useApi(),
        shifts = require("../config/shifts.config.json"),
        timeSlots = require("../config/timeSlots.config.json");

    useEffect(() => {
        Promise.all([
            api.get({path: 'tables'}),     // 0
            api.get({path: 'presenters'}), // 1
        ]).then((values) => {
            setTables(values[0]);
            setPresenters(values[1]);
        })
    }, [])

    const generate = () => {
        const tablesPerGroup = 4;

        // Assign schedule for each table
        let tablesWithSchedule = [];
        tables.map((table) => {
            tablesWithSchedule.push({...table, timeSlots: [
                    ...deepCopyObject(timeSlots.morning),
                    ...deepCopyObject(timeSlots.afternoon),
                    ...deepCopyObject(timeSlots.night)
                ]})
        })

        // Assign schedule for each presenter
        let currentShift = 'morning',
            presentersWithSchedule = [];
        presenters.map((presenter) => {
            presentersWithSchedule.push({
                    ...presenter,
                    shift: currentShift,
                    timeSlots: deepCopyObject(timeSlots[currentShift])
                });
            currentShift = shuffleShifts(currentShift);
        })

        // Function to take care of presenters' array pointer while iterating
        let presenterCounter = 0;
        const handlePresenterCounter = () => {
            if (presenterCounter === presentersWithSchedule.length-1) {
                return presenterCounter = 0;
            }
            presenterCounter++;
        }

        shifts.map((shift) => {
            const shiftTimeSlots = timeSlots[shift.category];

            // For each time slot
            shiftTimeSlots.map(({from}) => {

                // For each table
                tablesWithSchedule.map((table) => {
                    let tTimeSlot = table.timeSlots.find((ts) => {
                        return (from === ts.from && !ts.presenter)
                    })

                    if (!tTimeSlot) return;

                    // Find available Presenter
                    const findAvailablePresenter = () => {
                        const presenter = presentersWithSchedule[presenterCounter];
                        handlePresenterCounter();

                        const pTimeSlot = presenter.timeSlots.find((ts) => {
                            return (from === ts.from && !ts.table)
                        })
                        if (!pTimeSlot) {
                            return findAvailablePresenter();
                        } else {
                            return {pTimeSlot, presenterId: presenter.id}
                        }
                    }
                    const { pTimeSlot, presenterId } = findAvailablePresenter();

                    if (pTimeSlot && tTimeSlot) {
                        pTimeSlot.table = table.id;
                        tTimeSlot.presenter = presenterId;
                    }
                })
            })
        })

        console.log('tablesWithSchedule');
        console.log(tablesWithSchedule);
        console.log('presentersWithSchedule');
        console.log(presentersWithSchedule);

        return {
            tables: tablesWithSchedule,
            presenters: presentersWithSchedule
        }


        // 3 game groups of 4 tables each (total tables: 12)
        // 4 + 1 presenters per group, per shift
        // (5 * 3) * 3 = At least 45 presenters needed


    }

    return {
        generate
    }
}