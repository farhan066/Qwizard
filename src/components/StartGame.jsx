export default function StartGame(props){
    return(
        <section id="start-game">
            <h1>Qwizard</h1>
            <p>How smart are you? Let's see if you can solve some fun quizzes!</p>
            <button className="btn" onClick={props.startQuiz}>Start Quiz</button>
        </section>
    )
}