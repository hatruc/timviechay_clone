import React from "react";
import s from "./Box_tag_candidate.module.scss";
import Link from "next/link";

interface ItemTagProps {
    nameJob: string;
}
const Item_tag: React.FC<ItemTagProps> = ({ nameJob }) => {
  return (
    <>
      {nameJob && (
        <div className={s.item_tag}>
          {/* TODO Link đên đến trang tìm theo ngành nghề */}
          <Link href={"#"} className={s.name_tag}>
            {nameJob}
          </Link>
        </div>
      )}
    </>
  );
};

interface CategoryProps {
  listJob: any;
}
const Box_category: React.FC<CategoryProps> = ({ listJob }) => {
  return (
    <div className={s.item_category}>
      <p className={s.name_cate}>Ngành nghề</p>
      <div className={s.list_cate_tag}>
        {listJob && listJob.length > 0 &&
          listJob.map((job: any, index: number) => <Item_tag nameJob={job?.jobName} />)}
      </div>
    </div>
  );
};

export interface TagCandidateProps {
  dataTagCandidate: any;
}
const Box_tag_candidate: React.FC<TagCandidateProps> = ({
  dataTagCandidate
}) => {
  return (
    <div className={s.box_tag_candidate}>
      <Box_category listJob={dataTagCandidate?.use_nganh_nghe} />
      {/* <Box_category /> */}
    </div>
  );
};

export default Box_tag_candidate;
