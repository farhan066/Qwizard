import { useState } from 'react'
export default function SingleQuiz(props) {
    
    const [selectedOption, setSelectedOption] = useState()

    function setClass(option){
        const selected = Array.isArray(props.result) && props.result.length > 0
                ? props.result.find(item => item.id === props.id)
                : "null";

                if (props.result && props.result.length > 0) {
                    if(option === props.correct_option){
                        return "correct"
                    }
                    if (selectedOption === option) {
                        return selected.isCorrect === "incorrect" ? "incorrect" : "";
                    }
                    return "false"
                } else if (selectedOption === option) {
                    return "selected";
                }
                return "";
    }

    function optionElemenets() {
       return props.options.map((option, index) => (
            <label 
                key={index} 
                className={setClass(option)}
            > {option}
                <input
                    type="radio"
                    name="option"
                    disabled={props.desabled}
                    checked={selectedOption === option}
                    onChange={() => 
                        { 
                            setSelectedOption(option)
                            props.listAnswers(option, props.id)
                        }
                    }
                />
            </label>
        ))
    }
    return (
        <div className="single_quiz">
            <h2 className="ques">{props.question}</h2>
            <form className="options">
                {optionElemenets()}
            </form>
        </div>
    )
}