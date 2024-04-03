import EvolutionStratergyAgentModal from "./common/EvolutionStratergyAgentModal";

export default function EvolutionStratergyAgent(props) {
    const api = "http://127.0.0.1:5000/evolution_stratergy_agent";
    const description = `The deep evolution strategy algorithm is used to develop and refine trading strategies based on historical price data. The algorithm initializes a population of trading models, each with randomly initialized weights and each model represents a candidate trading strategy. The the performance of each trading model is evaluated using historical price data. Following this, the trading strategy defined by each model is executed and its performance is measured based on metrics such as cumulative return, Sharpe ratio, or other relevant indicators. Then, the top-performing trading models from the population based on their evaluation scores is selected. Models with higher performance are more likely to be selected for the next generation. The deep evolution strategy algorithm in trading combines principles of evolutionary computation with neural networks to optimize the weights and parameters of trading models. By iteratively evaluating, selecting, varying, and repopulating the models, the algorithm aims to discover and refine trading strategies that demonstrate strong performance on historical price data.`;
    return (
        <EvolutionStratergyAgentModal
            description={description}
            api={api}
            fullForm={props.fullForm}
            isDisabledUnits={false}
            isDisabledDropRate={false}
        />
    );
}
