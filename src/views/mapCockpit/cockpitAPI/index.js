import axios from "axios";

export async function get_vehicle_location(token, vehicle_number) {
    try {
        const app_id = 'fleetmatics-p-us-LU4FJW5GroNHqCGnKXdmUnFOOtGI84dfVaWBqkBL';
        const endpoint = `https://fim.api.us.fleetmatics.com/rad/v1/vehicles/${vehicle_number}/location`;
        const headers =
        {
            Authorization: `Atmosphere atmosphere_app_id=${app_id}, Bearer ${token}`,
            Accept: 'application/json',
        };
        const res = await axios({
            method: 'get',
            url: endpoint,
            headers
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
