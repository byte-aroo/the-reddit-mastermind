import { PreviewRow } from "./PreviewRow";
import { PreviewList } from "./PreviewList";
import { PostSchedule } from "../utils/datetime";

type PreviewProps = {
    companyId: string;
    personas: string[];
    subreddits: string[];
    queries: string[];
    postsPerWeek: string;
    companies: { uuid: string; name: string }[];
    postingSchedule: PostSchedule[];
};

export function PlannerPreview({
    companyId,
    personas,
    subreddits,
    queries,
    postsPerWeek,
    companies,
    postingSchedule,
}: PreviewProps) {
    const company = companies.find(c => c.uuid === companyId);

    return (
        <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg">Live Plan Preview</h3>

            <PreviewRow
                label="Company"
                value={company?.name}
            />

            <PreviewList
                label="Personas"
                items={personas}
            />

            <PreviewList
                label="Subreddits"
                items={subreddits}
            />

            <PreviewList
                label="Queries"
                items={queries}
            />

            <PreviewRow
                label="Posts / Week"
                value={postsPerWeek}
            />
            {/* Derived info */}
            {postingSchedule.length > 0 && (
                <div className="mt-4 p-4 rounded-xl bg-gray-50 text-sm text-black flex flex-col gap-3">
                    {postingSchedule.map(schedule => (
                        <div
                            key={schedule.day}
                            className="flex flex-col gap-1"
                        >
                            <span className="font-medium">
                                {schedule.day} — {schedule.postsCount} post
                                {schedule.postsCount > 1 ? "s" : ""}
                            </span>

                            {schedule.postTimes.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {schedule.postTimes.map((time: string) => (
                                        <span
                                            key={time}
                                            className="px-2 py-1 rounded-full bg-gray-200 text-xs"
                                        >
                                            {time}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500 text-xs">No times</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
