import privateClient from "../configs/privateClient";
import publicClient from "../configs/publicClient";
import { VegetablePayload } from "src/types/vegetable";

const vegetableEndpoints = {
    list: "vegetable",
    add: "vegatable",
    getById: (vegetableId: string) => `vegetable/${vegetableId}`,

}

const vegetableApi = {
    addVegetable: async({ ...props }: VegetablePayload) => {
        try {
            const { providerId, categoryId, unitId, medias, uploadTo, vegetable } = props
            let formData = new FormData();
            providerId && formData.append('providerId', providerId);
            formData.append('categoryId', categoryId.toString());
            formData.append('medias', medias);
            uploadTo && formData.append('uploadTo', uploadTo);
            formData.append('vegetable', new Blob([JSON.stringify(vegetable)], {
                type: 'application/json'
            }));
            formData.append('unitId', unitId.toString());

            const response = await privateClient.post(
                vegetableEndpoints.add,
                formData
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
    }
}

export default vegetableApi;