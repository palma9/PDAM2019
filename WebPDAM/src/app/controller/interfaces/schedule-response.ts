export interface ScheduleResponse {
    id: string,
    timeInterval: 2,
    dayOfWeek: 3,
    room: {
        id: string,
        classNumber: number
    },
    subject: {
        id: string,
        grade: {
            name: string,
            id: string,
        },
        name: string
    },
    teacher: {
        id: string,
        name: string
    },
    sub: boolean
}
