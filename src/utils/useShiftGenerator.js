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
        if (!tables || !presenters) {
            return alert('No tables or presenters available');
        }

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
        const numOfPresentersPerShift = Math.floor(presenters.length/shifts.length);
        let currentShift = 'morning',
            presentersWithSchedule = [],
            $i = 0;
        presenters.map((presenter) => {
            presentersWithSchedule.push({
                    ...presenter,
                    shift: currentShift,
                    timeSlots: deepCopyObject(timeSlots[currentShift])
                });

            $i++;
            if ($i === numOfPresentersPerShift) {
                currentShift = shuffleShifts(currentShift);
                $i = 0;
            }
        })

        // Function to take care of presenters' array pointer while iterating
        let presenterCounter = 0;
        const handlePresenterCounter = () => {
            if (presenterCounter === presentersWithSchedule.length-1) {
                return presenterCounter = 0;
            }
            presenterCounter++;
        }

        let scheduleData = {
            timeTable: [],
            columns: []
        };

        shifts.map((shift) => {
            const shiftTimeSlots = timeSlots[shift.category];

            // For each time slot
            shiftTimeSlots.map(({from, to}) => {
                scheduleData.columns.push({from, to, label: `${from} - ${to}`});

                // For each table
                tablesWithSchedule.map((table) => {
                    let tTimeSlot = table.timeSlots.find((ts) => {
                        return ((from === ts.from) && !ts.presenter)
                    })

                    // Find available Presenter
                    const findAvailablePresenter = () => {
                        const presenter = presentersWithSchedule[presenterCounter];
                        handlePresenterCounter();

                        const pTimeSlot = presenter.timeSlots.find((ts) => {
                            return ((from === ts.from) && !ts.table)
                        })
                        if (!pTimeSlot) {
                            return findAvailablePresenter();
                        } else {
                            return {timeSlot: pTimeSlot, name: presenter.name, id: presenter.id}
                        }
                    }
                    const presenter = findAvailablePresenter();

                    if (presenter.timeSlot) {
                        presenter.timeSlot.table = { id: table.id, name: table.name };
                        tTimeSlot.presenter = presenter.id;

                        scheduleData.timeTable.push({
                            timeSlot: {from, to, label: `${from} - ${to}`},
                            presenter: {id: presenter.id, name: presenter.name},
                            table: {id: table.id, name: table.name}
                        })
                    }
                })
            })
        })

        // Group data by presenter (row)
        let tableData = {}
        scheduleData.timeTable.map(({timeSlot, presenter, table}) => {
            if (tableData[presenter.id]) {
                tableData[presenter.id].schedule.push({timeSlot: timeSlot, table: {id: table.id, name: table.name}});
            } else {
                tableData[presenter.id] = {
                    id: presenter.id,
                    name: presenter.name,
                    schedule: [{timeSlot: timeSlot, table: {id: table.id, name: table.name}}]
                };
            }
        })

        // Sort presenter timeSlots
        Object.values(tableData).map(({schedule}) => {
            schedule.sort(( a, b ) => {
                if ( a.timeSlot.from < b.timeSlot.from ){
                    return -1;
                }
                if ( a.timeSlot.from > b.timeSlot.from ){
                    return 1;
                }
                return 0;
            });
        })

        return {tableData, columns: scheduleData.columns};
    }

    return {
        generateShiftForDay: generate
    }
}