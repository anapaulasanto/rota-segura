import React from "react";

const Form = ({ firstLabel, firstPlaceholder, secondLabel, secondPlaceholder, textButtonForm, classNameBtn }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <form className="flex flex-col items-start justify-center h-3/4 py-8 px-10 gap-4 text-neutral-500 w-full">
                <label className="flex items-center gap-1 invalid:border-pink-500">{firstLabel} </label>
                <input
                    type="text"
                    className="border border-neutral-500 rounded-full w-full py-3 px-3"
                    placeholder={firstPlaceholder}
                    required="required"
                />
                <label className="flex items-center gap-1">{secondLabel}</label>
                <input
                    type="text"
                    className="border border-neutral-500 rounded-full w-full py-3 px-3 "
                    placeholder={secondPlaceholder}
                    required="required"
                />
            </form>
            <button
                type="submit"
                className={classNameBtn}
            >{textButtonForm}
            </button>
        </div>
    )
};

export default Form;
