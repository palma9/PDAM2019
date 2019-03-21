export interface SubstitutionResponse {
    id: string,
    date: Date,
    schedule: {
        timeInterval: number,
        dayOfWeek: number,
        room: {
            id: string,
            classNumber: number
        }
        subject: {
            name: string,
            grade: {
                name: string,
                id: string
            },
            id: string
        },
        teacher: string,
        id: string
    },
    newTeacher: {
        id: string,
        name: string;
    }
}
