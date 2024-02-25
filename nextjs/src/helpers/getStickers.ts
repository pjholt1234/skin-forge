import axios, {AxiosResponse} from "axios";

const getStickers = async (): Promise<any[]>  => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/stickers`;

    return await axios.get(endpoint, {
        headers: {
            'authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
        }
    })
        .catch((error: any) => {
            console.error('Error fetching stickers:', error);
            return [];
        }).then((response: AxiosResponse) => {
            return response.data;
        });
}

export default getStickers;