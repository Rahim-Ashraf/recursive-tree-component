import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface Item {
    id: number;
    nodeName: string;
    nodes: Item[];
}

export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        currId: 1,
        id: 1,
        nodeName: 'Root Node',
        nodes: <Item[]>[]
    },
    reducers: {

        add: (state, action: PayloadAction<{ id: number, nodeName: string }>) => {

            const currNode = (s: Item, id: number, nodeName: string) => {
                if (s.id === id) {
                    state.currId += 1
                    s.nodes.push({ id: state.currId, nodeName, nodes: [] })
                    return
                }
                else {
                    for (const el of s.nodes)
                        currNode(el, id, nodeName)
                }
            }
            currNode(state, action.payload.id, action.payload.nodeName)
        },


        remove: (state, action: PayloadAction<{ id: number }>) => {
            const currNode = (s: Item, id: number) => {
                if (s.id === id) {
                    return 1
                }
                else {
                    for (const el of s.nodes) {
                        const isMatch = currNode(el, id)
                        if (isMatch) {
                            // console.log(s)
                            s.nodes = s.nodes.filter((item) => item.id !== action.payload.id)
                            // console.log(s)
                            return 0
                        }
                    }
                    return 0
                }
            }
            currNode(state, action.payload.id)
        },

    }
})


export const { add, remove } = cardSlice.actions

export default cardSlice.reducer