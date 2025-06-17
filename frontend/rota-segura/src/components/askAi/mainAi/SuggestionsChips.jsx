import React from "react";

const SuggestionsChips = ({ handleSendMessage }) => {
    const suggestionChips = [
        "Tempo estimado de chegada?",
        "Há congestionamentos?",
        "Postos de gasolina no caminho",
        "Rotas alternativas"
    ];

    const handleChipClick = (question) => {
        handleSendMessage(question);
    };

    return (
        <div className="flex flex-wrap gap-2 mt-10 justify-center self-end">
            {suggestionChips.map(chip => (
                <button key={chip} onClick={() => handleChipClick(chip)} className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-50">
                    {chip}
                </button>
            ))}
        </div>
    )
};

export default SuggestionsChips;
