import { randomInt, pad, random } from "./utils";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Can be optimised based on analytics further.
const timeSlots = [
    [9, 12],   // Morning
    [12, 15],  // Afternoon
    [15, 17],  // Evening
    [17, 20],  // Night
    [20, 23],  // Late Night
];

export interface PostSchedule {
    day: string;
    postsCount: number;
    postTimes: string[];
}


export function generatePostingSchedule(postsPerWeek: number): PostSchedule[] {
    const schedule = getDayCountOfPosts(postsPerWeek);

    return schedule.map((postSchedule) => ({
        ...postSchedule,
        postTimes: getPostingTimes(postSchedule.postsCount)
    }))
}


/* 
    For now simply adding posts left +1 from day 1. 
    In future can be optimised on the basis of which day and time gets more views or audience engagement based on analytics.
*/
export function getDayCountOfPosts(postsPerWeek: number) {
    const postsPerDay = Math.floor(postsPerWeek / 7);   // Distributing posts evenly across the week.
    let postsLeft = postsPerWeek % 7; // Will always be 6 or less. 

    const schedule = days.map((day) => ({
        day,
        postsCount: postsPerDay
    }))

    for (let i = 0; i < postsLeft; i++) {
        schedule[i].postsCount += 1;
    }
    return schedule;
}


/* 
    Can be optimised based on if count is smaller we can choose timings which give good engagement.
    As of now picking 1st come 1st selected.
*/
export function getPostingTimes(count: number) {
    const times = [];
    for (let i = 0; i < count; i++) {
        const slot = timeSlots[i % timeSlots.length];
        const hour = randomInt(slot[0], slot[1]);
        const minute = randomInt(0, 59);
        times.push(`${pad(hour)}:${pad(minute)}`);
    }
    return times.sort();
}