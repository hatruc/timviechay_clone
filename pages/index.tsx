import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Body from "@/components/home/Body";
import { NextPageContext } from "next";
import { SWRConfig } from 'swr';
import { POST_SERVER } from "./api/base-api";
// import { getNewTagFromXlsx } from "@/functions/functions";
import fs from 'fs';
import * as XLSX from 'xlsx';
import { createLinkTilte2 } from "@/functions/functions";
import { NTD_UV_Context } from "@/components/context/ntd_uv_context";
import { useContext, useEffect } from "react";


export const getServerSideProps = async (context: NextPageContext) => {
  const data = await POST_SERVER(`${process.env.NEXT_PUBLIC_BASE_URL_API_NEW}/new/Home`, { ga: 1 });

  const getNewTagFromXlsx = () => {
    try {
      const filePath = 'functions/data_category_city_joblike.xlsx';
      const fileBuffer = fs.readFileSync(filePath);
      // Read the Excel file
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

      // Assuming you want to read data from the second sheet
      const sheetName = workbook.SheetNames[1]; // Index 1 for the second sheet

      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON object, ignoring the first row (header)
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Create an array of objects with data from the second and third columns
      const dataArray = data.slice(1).map((row: any) => {
        return {
          tag: row[1], // Second column
          job: createLinkTilte2(row[2])  // Third column
        };
      });
      return dataArray;

    } catch (error) {
      console.log(error);

      return []
    }
  }

  const dataTag = getNewTagFromXlsx()


  return {
    props: {
      data,
      dataTag: dataTag,
    }
  }
}

export default function Home({ data, dataTag }: any) {
  // console.log(dataTag)
  const { setTagTin } = useContext(NTD_UV_Context)
  useEffect(() => {
    setTagTin(dataTag)
    return () => { };
  }, [])
  return (
    <>
      <Header />
      <SWRConfig
      >
        <Body data={data} />
      </SWRConfig>
      <Footer />
    </>
  )
}
