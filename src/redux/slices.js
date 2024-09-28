import { createSlice } from "@reduxjs/toolkit";

const auctionDataSlice = createSlice({
    name: 'auctionData',
    initialState: {auctionItems: {},bidData:[]},
    reducers: {
        setItems: (state, action)=>{
            state.auctionItems = action.payload
        },
        setBids : (state, action) =>{
            state.bidData = action.payload
        }

    }

})

export default auctionDataSlice.reducer
export const auctionActions = auctionDataSlice.actions

// {clothing:  key:{data}, key:{} }, {elecronics: key:{data}}, {}, {}