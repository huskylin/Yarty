import { createContext } from "react";
import { ListResponse } from '@/interface/list';

interface PartyListContext {
    raw: ListResponse[];
    playlist: any[];
    playlistKey: string;
}
export const partyListInitialState: PartyListContext = {
    raw: [],
    playlist: [],
    playlistKey: ''
};
export const partyListContext = createContext(partyListInitialState);

function onlyUnique(value: any, index: number, array: any[]) {
    return array.indexOf(value) === index;
}

export function reducer(state: any, action: any) {
    switch (action.type) {
        case 'add':
            const uniqueList = [...state.playlist, action.payload.playlist].flat().filter(onlyUnique)
            return {
                ...state,
                raw: [...state.raw, action.payload.raw],
                playlist: uniqueList,
                playlistKey: action.payload.playlistKey,
            };
        case 'reset':
            return partyListInitialState
        default:
            return partyListInitialState
    }
}
