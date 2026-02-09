interface Props {
    scores: { 
        player1: number;
        player2: number;
    }
}

const TotalScore = ({scores}: Props) => {
    return (
        <>
            <div className="flex flex-row justify-center items-center gap-4 text-[clamp(2rem,5vw,2.5rem)] font-bold">
                <span>
                    {scores.player1}
                </span>
                :
                <span>
                    {scores.player2}
                </span>
            </div>
        </>
    )
}
export default TotalScore