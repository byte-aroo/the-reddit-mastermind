"use client"
import { useState } from "react";
import { SelectDropdown } from "../components/SelectDropdown";
import { MultiSelectDropdown } from "../components/MultiSelectDropdown";
import { MultiInputChips } from "../components/MultiInputChips";
import { NumericInput } from "../components/NumericInput";
import { PlannerPreview } from "../components/PlannerPreview";
import { generatePostingSchedule } from "../utils/datetime";

type Company = {
    uuid: string;
    name: string;
    website: string;
    description: string;
};

type Personas = {
    uuid: string;
    username: string;
    name: string;
    role: string;
    roleDescription: string;
    style: string; // Like male-female & their tone can be saved, so every post/comment remains consistent.
};


// Will be fetched from DB
const COMPANIES: Company[] = [
    { uuid: "slideforge", name: "SlideForge", website: "slideforge.com", description: "Description" },
];


// Will be fetched from DB
const PERSONAS: Personas[] = [
    { uuid: "riley_ops", username: "riley_ops", name: "Riley Ops", role: "Head Operations", roleDescription: "Role Desc", style: "male soft tone" },
    { uuid: "jordan_consults", username: "jordan_consults", name: "Jordan Consults", role: "Consultant", roleDescription: "Role Desc", style: "male formal tone" },
    { uuid: "emily_econ", username: "emily_econ", name: "Emily Econ", role: "Economist", roleDescription: "Role Desc", style: "female soft tone" },
    { uuid: "alex_sells", username: "alex_sells", name: "Alex Sells", role: "Head Of Sales", roleDescription: "Role Desc", style: "male high tone" },
    { uuid: "priya_pm", username: "priya_pm", name: "Priya PM", role: "Product Manager", roleDescription: "Role Desc", style: "female formal tone" },
];

export default function ContentPlanner() {
    const [companyId, setCompanyId] = useState<string>("");
    const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
    const [subreddits, setSubreddits] = useState<string[]>([]);
    const [llmQueries, setLlmQueries] = useState<string[]>([]);
    const [postsPerWeek, setPostsPerWeek] = useState<string>("");


    function isFormValid() {
        return (
            companyId.trim() !== "" &&
            selectedPersonas.length > 0 &&
            subreddits.length > 0 &&
            llmQueries.length > 0 &&
            Number(postsPerWeek) > 0
        );
    }

    function handleGenerate() {
        if (!isFormValid()) {
            alert("Please fill all fields before generating.");
            return;
        }
        alert("Plan generated successfully!");
    }

    return (
        <div className="sm:p-5">
            <div
                className="flex
                justify-center items-center
                font-extrabold text-2xl my-10">
                The Reddit Mastermind
            </div>

            <div className="flex sm:flex-row flex-col justify-between items-start">

                <div className="grid grid-cols-1 m-5 p-2.5 sm:m-15 sm:p-10 gap-8 sm:gap-15 border border-gray-200 rounded-2xl">
                    <span className="font-bold">Enter the details below to generate plan:</span>
                    <div className="grid sm:grid-cols-[0.7fr_1fr] gap-2 sm:gap-0">
                        <span className="flex justify-left items-center">Select Company</span>
                        <SelectDropdown
                            dropdownType="Company"
                            dropdownId={companyId}
                            setDropdownId={setCompanyId}
                            options={COMPANIES}
                        />
                    </div>

                    <div className="grid sm:grid-cols-[0.7fr_1fr] gap-2 sm:gap-0">
                        <span className="flex justify-left items-center">Select Personas</span>
                        <MultiSelectDropdown
                            dropdownType="Personas"
                            selectedIds={selectedPersonas}
                            setSelectedIds={setSelectedPersonas}
                            options={PERSONAS}
                        />
                    </div>

                    <div className="grid sm:grid-cols-[0.7fr_1fr] gap-2 sm:gap-0">
                        <span className="flex justify-left items-center">Insert Subreddits</span>
                        <MultiInputChips
                            placeholder="Add subreddits"
                            values={subreddits}
                            setValues={setSubreddits}
                        />
                    </div>

                    <div className="grid sm:grid-cols-[0.7fr_1fr] gap-2 sm:gap-0">
                        <span className="flex justify-left items-center">Insert Queries</span>
                        <MultiInputChips
                            placeholder="Add queries"
                            values={llmQueries}
                            setValues={setLlmQueries}
                        />
                    </div>

                    <div className="grid sm:grid-cols-[0.7fr_1fr] gap-2 sm:gap-0">
                        <span className="flex justify-left items-center">Posts Per Week</span>
                        <NumericInput
                            value={postsPerWeek}
                            placeholder="Posts per week"
                            setValue={setPostsPerWeek} />
                    </div>

                    {/* <button className="p-5 border border-gray-500 rounded-2xl font-bold">Generate</button> */}
                    <button
  onClick={handleGenerate}
  disabled={!isFormValid()}
  className={`
    p-5 rounded-2xl font-bold
    border transition-all
    ${
      isFormValid()
        ? "border-gray-500 hover:bg-gray-100"
        : "border-gray-300 text-gray-400 cursor-not-allowed"
    }
  `}
>
  Generate
</button>
                </div>

                <div className="w-[calc(100%-3rem)] sm:flex-1 m-5 p-2.5 sm:m-15 sm:p-10 bg-white/20 border border-gray-200 rounded-2xl backdrop-blur shadow-md">
                    <div className="">
                        <PlannerPreview
                            companyId={companyId}
                            personas={selectedPersonas}
                            subreddits={subreddits}
                            queries={llmQueries}
                            postsPerWeek={postsPerWeek}
                            companies={COMPANIES}
                            postingSchedule={generatePostingSchedule(parseInt(postsPerWeek))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}