import Catan from "../CatanGame";

export const getStages = () => {
    return Catan.turn.stages;
}

export const buildSettlementStageName = () => {
    return Catan.turn.stages.buildSettlement.key;
}