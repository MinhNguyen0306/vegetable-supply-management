import privateClient from "../configs/privateClient";
import publicClient from "../configs/publicClient";
import { VegetablePayload } from "src/types/vegetable";

const vegetableEndpoints = {
    list: "vegetable",
    add: (
        providerId: string | null | undefined,
        categoryId: number | null | undefined,
    ) => `vegetable?providerId=${providerId}&categoryId=${categoryId}`,
    getById: (vegetableId: string) => `vegetable/${vegetableId}`,
    lock: (vegetableId: string) => `vegetable/lock/${vegetableId}`
}

const vegetableApi = {
    addVegetable: async({ ...props }: VegetablePayload) => {
        try {
            const { providerId, categoryId, units, medias, uploadTo, vegetable } = props
            let formData = new FormData();
            if(medias) {
                for(let i = 0; i < medias.length; i++) {
                    formData.append('medias', medias[i]);
                }
            }
            units.forEach(unit => {
                formData.append('units', unit);
            })
            // formData.append('medias', medias);
            formData.append('vegetable', new Blob([JSON.stringify(vegetable)], {
                type: 'application/json'
            }));

            const response = await privateClient.post(
                vegetableEndpoints.add(providerId, categoryId),
                formData, {
                    headers: { 'content-type': 'multipart/form-data' },
                }
            );
            return { response }
        } catch (error) {
            return { error }
        }
    },
    listVegetable: async () => {
        try {
            const response = await publicClient.get(
                vegetableEndpoints.list
            );

            return { response }
        } catch (error) {
            return { error }
        }
    },
    getVegetableById: async (vegetableId: string) => {
        try {
            const response = await publicClient.get(
                vegetableEndpoints.getById(vegetableId),
            );

            return { response }
        } catch (error) {
            return { error }
        }
    },
    lockVegetable: async (vegetableId: string) => {
        try {
            const response = await privateClient.patch(
                vegetableEndpoints.lock(vegetableId)
            );

            return { response } 
        } catch (error) {
            return { error }
        }
    }
}

export default vegetableApi;