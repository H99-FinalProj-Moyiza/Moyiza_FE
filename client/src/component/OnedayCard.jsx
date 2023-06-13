import React from "react";
import { useNavigate } from "react-router-dom";

function OnedayCard({
  id,
  thumbnail,
  title,
  tag,
  size,
  content,
  attendantsNum,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`/oneday/${id}`);
        }}
        className="cursor-pointer flex shadow-cms bg-white p-6 rounded-xl h-full"
      >
        <img
          className="aspect-square rounded-md w-[219px] h-[219px] object-cover mr-6"
          src={thumbnail}
          alt="clubThumbnail"
        />
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="flex justify-between text-xs text-green-500">
            <div className="flex gap-2">
              {tag.map((tag) => {
                return (
                  <div className="rounded-full border-2 px-2 py-1 border-green-500">
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex h-full justify-between  flex-col">
            <div>
              <div className="border-b-[1.5px] border-black w-full text-2xl font-bold">
                {title}
              </div>
              <div className="text-sm">{content}</div>
            </div>
            <div className=" text-neutral-400 text-sm">
              {attendantsNum} / {size}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnedayCard;
