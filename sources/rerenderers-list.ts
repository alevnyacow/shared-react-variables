class RerenderersList {
    private _rerenderersData: Record<string, Record<string, () => void>>;

    constructor() {
        this._rerenderersData = {};
    }

    private addForVariable = (variableId: string) => {
        this._rerenderersData[variableId] = {};
    };

    private existsForVariable = (variableId: string) => {
        return this._rerenderersData[variableId] !== undefined;
    };

    public add = (
        variableId: string,
        rerendererId: string,
        rerenderer: () => void
    ) => {
        if (!this.existsForVariable(variableId)) {
            this.addForVariable(variableId);
        }

        this._rerenderersData[variableId][rerendererId] = rerenderer;
    };

    public remove = (variableId: string, rerendererId: string) => {
        const variableRerendersData = this._rerenderersData[variableId];

        if (!variableRerendersData) {
            return;
        }

        delete variableRerendersData[rerendererId];
    };

    public fire = (variableId: string) => {
        if (!this.existsForVariable(variableId)) {
            return;
        }

        Object.values(this._rerenderersData[variableId]).forEach((rerender) => {
            rerender();
        });
    };
}

const rerenderersList = new RerenderersList();

export { rerenderersList };
