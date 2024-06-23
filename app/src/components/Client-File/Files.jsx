import React from "react";
import { FaFilePdf, FaFileImage } from "react-icons/fa6";
import { BsFiletypeDoc, BsFiletypeDocx } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { Tooltip } from "flowbite-react";

const Files = ({ media }) => {
  function FileIcon({ mediaItem }) {
    const iconSize = 50;

    if (mediaItem.mime_type.includes("pdf"))
      return <FaFilePdf size={iconSize} />;
    else if (mediaItem.mime_type.includes("image"))
      return <FaFileImage size={iconSize} />;
    else if (mediaItem.mime_type.includes("docx"))
      return <BsFiletypeDocx size={iconSize} />;
    else if (mediaItem.mime_type.includes("doc"))
      return <BsFiletypeDoc size={iconSize} />;

    return <CgFileDocument size={iconSize} />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {media.map((mediaItem) => (
        <div className="p-3 flex items-center flex-col gap-2 justify-center hover:opacity-80 border border-black hover:shadow-lg transition-all rounded-lg">
          <Tooltip key={mediaItem.id} content={mediaItem.file_name}>
            <a href={mediaItem.original_url} target="blank">
              <FileIcon mediaItem={mediaItem} />
            </a>
          </Tooltip>
          <div className="w-full text-center">
            <p className="text-sm truncate overflow-hidden whitespace-nowrap">
              {mediaItem.file_name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Files;
