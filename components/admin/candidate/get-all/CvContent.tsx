import { Flex } from "antd";
import axios from "axios";
import Image from "next/image";
import React from "react";

interface CvContentProps {
  data: any;
}

const CvContent = ({ data }: CvContentProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: "40px"
      }}
    >
      {data?.map((cv: any) => (
        <div
          key={cv.id}
          style={{
            position: "relative",
            width: "calc(50% - 10px)",
            height: "620px"
          }}
        >
          <p style={{
            width: '100%',
            padding: '8px 10px',
            textAlign: 'center',
            fontWeight: '650',
            fontSize: '14px',
            color:'#27635D'
          }}>{cv.name}</p>
          <a download={`${cv.alias}.pdf`}  href={cv.cv_pdf}
          onClick={(e) => e.stopPropagation()}
          >
            <img
              style={{
                width: "100%",
                height: '600px'
              }}
              src={cv.name_cv}
              alt={cv.alias}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default CvContent;
