import React from "react";
import { IoCarSportSharp } from "react-icons/io5";
import SuggestionsChips from "./SuggestionsChips";
import CardMessageAi from "./CardMessageAi";

const MainAi = ({ routeVia, routeInfo, messages, isLoading, handleSendMessage }) => {
    return (
        <main className="flex flex-col gap-2 flex-1 overflow-y-auto bg-orange-50 ">
            <div className="pb-3">
                <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <IoCarSportSharp className="text-2xl text-gray-600" />
                        <div>
                            <p className="font-bold text-gray-800">Via {routeVia}</p>
                            <p className="text-sm text-gray-500">{routeInfo.distance.text} • {routeInfo.duration.text}</p>
                        </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Ativo</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 max-w-5xl mx-auto bg-orange-50">
                <CardMessageAi isLoading={isLoading} messages={messages} />
                <SuggestionsChips handleSendMessage={handleSendMessage} />
            </div>
        </main>
    )
};

export default MainAi;
