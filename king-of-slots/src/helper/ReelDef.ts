class ReelDef {

    private symbols: Map<number, string> = new Map()

    addSymbol(id: number, symbolTexture: string) {
        this.symbols.set(id, symbolTexture)
    }

    getMatrix() {
        return [
            [ 1, 2, 3 ],
            [ 1, 2, 3 ],
            [ 1, 2, 3 ],
            [ 1, 2, 3, 4, 5, 6 ],
            [ 1, 2, 3, 4, 5, 6 ]
        ]
    }

}

export default ReelDef