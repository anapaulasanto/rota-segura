import React from "react";
import { LuNavigation } from "react-icons/lu";

const CardStepsNavigation = ({ leg }) => {
    return (
        <div className="flex flex-col gap-4 bg-white p-4 py-6 w-5/6 h-4/5 rounded-2xl shadow-xl overflow-y-auto">
            <div className="flex items-center gap-1 mb-3 pb-3 border-b">
                <LuNavigation className="text-xl" />
                <h2 className="text-2xl font-bold text-neutral-700">Instruções de navegação</h2>
            </div>
            <ol className="list-decimal list-inside space-y-3">
                {leg.steps.map((step, index) => (
                    <div className="border p-3 rounded-lg" key={index}>
                        <li
                            dangerouslySetInnerHTML={{ __html: step.html_instructions }}
                        />
                    </div>
                ))}
            </ol>
        </div>
    )
};

export default CardStepsNavigation;
