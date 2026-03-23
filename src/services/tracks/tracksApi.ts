import axios from "axios"
import { BASE_URL } from "../constants"
import { PlayListType, TrackType } from "@/sharedTypes/sharedTypes"

export const getAllTracks = (): Promise<TrackType[]> => {
    return axios(BASE_URL + '/catalog/track/all/').then((res) => {
        return res.data.data
    })
}

export const getTracksSelection = (id: string): Promise<PlayListType> => {
    return axios(BASE_URL + `/catalog/selection/${id}/`).then((res) => {
        return res.data.data
    })
}