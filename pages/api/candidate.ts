import { base_timviec365 } from "@/components/service/functions";
import axios from "axios";

// get don alias
export const getAllCandidate = async (obj: any, token?: string, type?: string) => {
    try {
        const res = await axios.post(
            `https://timviechay.vn/api/work247/admin/list`,
            obj,
            {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': `${type ? type : 'application/json'}`
                }
              }
        );

        const { data } = res.data;
        return data;
    } catch (error) {}
};

export const getTotal =   (obj: any, token: string, type: string) => {
       axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/count`,
          obj,
          {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `${type ? type : 'application/json'}`
              }
            }
      ).then((response) => {
        return response
      })
      .catch((error) => {
         return error
      });
};
