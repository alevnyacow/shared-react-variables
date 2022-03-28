import { Rerenderer } from "./use-rerenderer";

type RerenderersData = {
    [variableId: string]: { [rerendererId: string]: Rerenderer };
};

/**
 * Describes a list of rerenders can be used to register/delete/fire rerenderers.
 */
class RerenderersList {
    private _rerenderersData: RerenderersData;

    constructor() {
        this._rerenderersData = {};
    }

    /**
     * Checks if rerenderers data has a section associated with given variable.
     *
     * @param variableId Variable identifier.
     */
    private existsForVariable = (variableId: string) => {
        return this._rerenderersData[variableId] !== undefined;
    };

    /**
     * Adds a section for a given variable.
     *
     * @param variableId Variable identifier.
     *
     * @throws {@link Error} When tried to add a section for a variable that already exists.
     */
    private addForVariable = (variableId: string) => {
        if (this.existsForVariable(variableId)) {
            throw new Error(
                "Tried to add a section for a variable that already exists."
            );
        }

        this._rerenderersData[variableId] = {};
    };

    /**
     * Registers new rerenderer for a given variable.
     *
     * @param variableId Variable identifier.
     * @param rerendererId Rerenderer identifier.
     * @param rerenderer Rerenderer logic.
     */
    public add = (
        variableId: string,
        rerendererId: string,
        rerenderer: Rerenderer
    ) => {
        if (!this.existsForVariable(variableId)) {
            this.addForVariable(variableId);
        }

        this._rerenderersData[variableId][rerendererId] = rerenderer;
    };

    /**
     * Unregisters a rerender from variable by an identifier.
     *
     * @param variableId Variable identifier.
     * @param rerendererId Rerenderer identifier.
     *
     * @throws {@link Error} When tried to remove variable data that does not exist.
     */
    public remove = (variableId: string, rerendererId: string) => {
        if (!this.existsForVariable(variableId)) {
            throw new Error(
                "Tried to remove variable data that does not exist."
            );
        }

        const variableRerendersData = this._rerenderersData[variableId];
        delete variableRerendersData[rerendererId];
    };

    /**
     * Fires every rerenderer associated with a given variable.
     *
     * @param variableId Variable identifier.
     *
     * @throws {@link Error} When tried to fire rerenders for a variable that does not exist.
     */
    public fire = (variableId: string) => {
        if (!this.existsForVariable(variableId)) {
            throw new Error(
                "Tried to fire rerenders for a variable that does not exist."
            );
        }

        Object.values(this._rerenderersData[variableId]).forEach((rerender) => {
            rerender();
        });
    };
}

const rerenderersList = new RerenderersList();

export { rerenderersList };
